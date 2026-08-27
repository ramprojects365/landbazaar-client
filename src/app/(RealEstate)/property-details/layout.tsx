
import BackToTop from '@/components/Common/BackToTop';
import GoogleMapsProvider from '@/components/HeroBanner/subComponents/GoogleMapsProvider';
import CommonFooter from '@/layouts/Footers/CommonFooter';
import CommonHeader from '@/layouts/Headers/CommonHeader';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Wrapper>
                <CommonHeader />
                <GoogleMapsProvider deferChildren>
                    {children}
                </GoogleMapsProvider>
                <CommonFooter className='pt-140' />
                <BackToTop />
            </Wrapper>
        </>
    )
}
