'use client';

import { useState, FormEvent } from 'react';

interface SubscribeFormProps {
    onSubmit?: (email: string) => Promise<void>;
}

export default function SubscribeForm({ onSubmit }: SubscribeFormProps) {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Validate email
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error('Please enter a valid email address');
            }

            // If onSubmit prop is provided, call it
            if (onSubmit) {
                await onSubmit(email);
            }

            setSuccess(true);
            setEmail('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
            <div className="flex items-end justify-between">
                <div className='flex flex-col lg:w-[312px] w-[60%]'>
                    <label className='text-white text-sm font-medium pb-1' htmlFor="email">Email</label>
                    <div className='flex items-center md:gap-[14px] gap-2.5 bg-white border-[#D1D5DB] border md:p-3 p-2 rounded-[6px]'>
                        <span className='w-5 h-5'>
                            <svg className='w-full h-full' viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.003 6.384L10 10.382L17.997 6.384C17.9674 5.87444 17.7441 5.39549 17.3728 5.04523C17.0016 4.69497 16.5104 4.49991 16 4.5H4C3.48958 4.49991 2.99845 4.69497 2.62718 5.04523C2.25591 5.39549 2.0326 5.87444 2.003 6.384Z" fill="#14123A" />
                                <path d="M18 8.618L10 12.618L2 8.618V14.5C2 15.0304 2.21071 15.5391 2.58579 15.9142C2.96086 16.2893 3.46957 16.5 4 16.5H16C16.5304 16.5 17.0391 16.2893 17.4142 15.9142C17.7893 15.5391 18 15.0304 18 14.5V8.618Z" fill="#14123A" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className=" placeholder:text-secondry md:placeholder:text-base placeholder:text-sm text-sm md:text-base md:w-[calc(100%-20px-14px)] w-[calc(100%-20px-10px)]  focus-visible:outline-none"
                            disabled={isLoading}
                        />
                    </div>

                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="lg:w-[calc(100%-312px-8px)] w-[calc(40%-14px)] bg-primary hover:bg-hoverPrimary transition text-white md:text-base text-sm md:py-[13.5px] py-2.5 pt-2 rounded-[8px]"
                >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && (
                <p className="text-green-500 text-sm">Successfully subscribed!</p>
            )}
        </form>
    );
}
