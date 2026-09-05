
import CommonHeader from '@/layouts/Headers/CommonHeader';
import CommonFooter from '@/layouts/Footers/CommonFooter';
import BackToTop from '@/components/Common/BackToTop';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Wrapper>
                <CommonHeader />
                {children}
                <CommonFooter />
                <BackToTop />
            </Wrapper>
        </>
    )
}
