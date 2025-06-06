export type LoginUserResponseDto = {

    email : string;
    username : string;
    roleId: number;
    roleDescription?: string;
    token: string;

}

export type LoginUserRequestDto = {
    username: string;
    password: string;
}