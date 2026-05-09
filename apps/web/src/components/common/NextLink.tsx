'use client';

import Link, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, forwardRef } from 'react';

type NextLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(
    function NextLink(props, ref) {
        return <Link ref={ref} {...props} />;
    },
);