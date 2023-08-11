export interface SuccessAlertDto {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    text: string
}