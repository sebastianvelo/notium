import { NextResponse } from "next/server"

export type ParamsId = {
    params: Promise<{ id: string }>
}

export type ParamsNoteId = {
    params: Promise<{ noteId: string }>
}

export type ResponseError = {
    error: string;
}

export type ResponseSuccess = {
    success: boolean
}

export type APIResponse<T = ResponseSuccess> = Promise<NextResponse<T | ResponseError>>;