'use client'
import { useState } from 'react';

const EmailToAdmin = () => {
    const [fromName, setFromName] = useState('');
    const [fromEmail, setFromEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSending(true);

        try {
            const response = await fetch('/api/userMail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fromName, fromEmail, subject, message }),
            });

            const result = await response.json();
            if (response.ok) {
                setStatus('Email sent successfully!');
                setFromName('');
                setFromEmail('');
                setSubject('');
                setMessage('');
            } else {
                setStatus('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('Failed to send email.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section id="contact" className="py-20 bg-gray-900 text-white">
            <h2 className="text-3xl font-bold text-center mb-10">Contact Us</h2>
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={fromName}
                        onChange={(e) => setFromName(e.target.value)}
                        className="w-full p-3 rounded bg-gray-800 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                        className="w-full p-3 rounded bg-gray-800 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full p-3 rounded bg-gray-800 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-3 rounded bg-gray-800 text-white"
                        rows={4}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={isSending}
                >
                    {isSending ? 'Sending...' : 'Send Message'}
                </button>
                {status && <p className="mt-4 text-center">{status}</p>}
            </form>
        </section>
    );
};

export default EmailToAdmin;
