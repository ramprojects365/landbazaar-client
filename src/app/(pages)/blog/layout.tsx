import BackToTop from '@/components/Common/BackToTop';
import CommonFooter from '@/layouts/Footers/CommonFooter';
import CommonHeader from '@/layouts/Headers/CommonHeader';
import Wrapper from '@/layouts/Wrapper';
import React from 'react';
import './blog-page.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="blog-page">
            <Wrapper>
                <CommonHeader />
                {children}
                <CommonFooter className='pt-60' />
                <BackToTop />
            </Wrapper>
        </main>
    )
}
