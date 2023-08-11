import { Skeleton, Typography } from "@mui/material"

export const CardSkeleton = () => {
    return (
        <>
            <Skeleton variant="rectangular" width={210} height={118} />
            <Typography component="div" variant='caption'>
                <Skeleton width={210} />
                <Skeleton width={210} />
            </Typography>
        </>
    )
}
