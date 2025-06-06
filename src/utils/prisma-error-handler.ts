interface ParsedError {
  type: string;
  message: string;
  code?: string;
  field?: string;
  originalMessage?: string;
}

interface PrismaError {
  code?: string;
  message: string;
  meta?: {
    target?: string | string[];
    [key: string]: any;
  };
}

export class PrismaErrorHandler {
  static parse(error: PrismaError): ParsedError {
    // Error de validación (campos faltantes)
    if (error.code === 'P2012' || (error.message.includes('Argument') && error.message.includes('missing'))) {
      return this.handleMissingArgument(error);
    }

    // Error de constraint único (duplicate)
    if (error.code === 'P2002') {
      return this.handleUniqueConstraint(error);
    }

    // Error de registro no encontrado
    if (error.code === 'P2025') {
      return this.handleNotFound(error);
    }

    // Error de referencia (foreign key)
    if (error.code === 'P2003') {
      return this.handleForeignKey(error);
    }

    // Error genérico
    return {
      type: 'UNKNOWN_ERROR',
      message: error.message,
      code: error.code || 'UNKNOWN'
    };
  }

  static handleMissingArgument(error: PrismaError): ParsedError {
    const message = error.message;
    
    // Extraer campo faltante usando regex
    const missingFieldMatch = message.match(/Argument `(\w+)` is missing/);
    
    if (missingFieldMatch) {
      const field = missingFieldMatch[1];
      return {
        type: 'MISSING_FIELD',
        message: `El campo '${field}' es requerido`,
        field: field
      };
    }

    // Fallback si no encuentra el patrón
    return {
      type: 'VALIDATION_ERROR',
      message: 'Faltan campos requeridos',
      originalMessage: message
    };
  }

  static handleUniqueConstraint(error: PrismaError): ParsedError {
    const target = error.meta?.target || ['campo'];
    const field = Array.isArray(target) ? target[0] : target;
    
    return {
      type: 'DUPLICATE_ERROR',
      message: `El ${field} ya está en uso`,
      field: field
    };
  }

  static handleNotFound(error: PrismaError): ParsedError {
    return {
      type: 'NOT_FOUND',
      message: 'Registro no encontrado'
    };
  }

  static handleForeignKey(error: PrismaError): ParsedError {
    return {
      type: 'REFERENCE_ERROR',
      message: 'Error de referencia en la base de datos'
    };
  }

  // Método helper para usar en try/catch
  static handleError(error: PrismaError): ParsedError {
    const parsedError = this.parse(error);
    return parsedError;
  }
}