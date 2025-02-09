"use client"
import React from 'react'
import { Card, CardFooter, CardTitle, CardDescription, CardContent, CardHeader } from '../ui/card'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DisplayCardProps {
    title: string;
    description: string;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    routingUrl?: string;
}

const DisplayCard = ({ title, description, content, footer, routingUrl }: DisplayCardProps  ) => {
    const router = useRouter();
    return (
        <div className='flex flex-col gap-2'>
            <div onClick={() => router.push(`${routingUrl}` || '/')}>
                <Card className='cursor-pointer hover:shadow-lg transition-all duration-300'>
                    <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {content && <CardContent>
                <p>{content}</p>
            </CardContent>}
            {footer && <CardFooter>
                <p>{footer}</p>
                    </CardFooter>}
                </Card>
            </div>
        </div>
    )
}

export default DisplayCard