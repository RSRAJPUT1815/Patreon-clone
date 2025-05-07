import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto px-8 md:px-4 py-8">
            <h1 className="text-4xl font-bold mb-6 text-center">About Get Me a Chai</h1>
            <p className="text-lg mb-10 text-center max-w-3xl mx-auto">
                Get Me a Chai is your creative launchpad — a community-powered crowdfunding platform where fans support creators by buying them a virtual chai. Whether you're an artist, developer, writer, or thinker, connect deeper with your supporters and bring your vision to life.
            </p>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-start">
                        <img className="w-20 h-20 rounded-full mr-4" src="/group.gif" alt="Fans Collaborate" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Fans Collaborate</h3>
                            <p>Your biggest fans want to support and be a part of your creative journey.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <img className="w-20 h-20 rounded-full mr-4" src="/coin.gif" alt="Support Creators" />
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Support with Chai</h3>
                            <p>Fans show love by buying you a chai — each cup helps fund your work directly.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4">Why Join Get Me a Chai?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">For Creators</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Receive direct, commission-free support</li>
                            <li>Engage your community in meaningful ways</li>
                            <li>Build sustainable income streams for your creative journey</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">For Fans</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Help creators keep doing what they love</li>
                            <li>Earn exclusive perks and shout-outs</li>
                            <li>Be a vital part of creative milestones and content</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4">Community Benefits</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Join an inclusive space built on respect and creativity</li>
                    <li>Collaborate and network with fellow creators and fans</li>
                    <li>Stay inspired with stories, events, and featured projects</li>
                </ul>
            </section>

            <section>
                <h2 className="text-3xl font-semibold mb-4">Grow with Us</h2>
                <p className="text-lg max-w-3xl">
                    Get Me a Chai isn't just a platform — it's a movement. Join a supportive community that believes in the power of small acts of kindness and creativity. Start your journey today and turn chai into change.
                </p>
            </section>
        </div>
    );
};

export default About;

export const metadata = {
    title: "About - Get Me A Chai",
};
