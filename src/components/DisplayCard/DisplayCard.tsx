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
                <Card className='cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 bg-card hover:bg-accent/5'>
                    <CardHeader>
                        <CardTitle className="text-primary">{title}</CardTitle>
                        <CardDescription className="text-muted-foreground">{description}</CardDescription>
                    </CardHeader>
                    {content && <CardContent className="text-card-foreground">
                        <p>{content}</p>
                    </CardContent>}
                    {footer && <CardFooter className="text-card-foreground/80">
                        <p>{footer}</p>
                    </CardFooter>}
                </Card>
            </div>
        </div>
    )
}

export default DisplayCard