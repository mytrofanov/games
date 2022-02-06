import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import page from './img/small_page_cr.jpg'
import text from './img/small_text_cr.jpg'

export default function SkeletonVariants() {
    return (
        <Stack spacing={1}>
            <img
                style={{
                    width: '70%',
                    marginLeft: '10%'
                }}
                alt={'analytics data'}
                src={text}
            />
            <img
                style={{
                    width: '70%',
                    marginLeft: '10%'
                }}
                alt={'analytics'}
                src={page}
            />

            <Skeleton variant="circular" width={'100%'}  />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="circular" width={'100%'}  />
            <Skeleton variant="rectangular" width={"100%"} height={100} />
            <Skeleton variant="circular" width={'100%'}  />
            <Skeleton variant="rectangular" width={"100%"} height={400} />
        </Stack>
    );
}
