import { footerLinks } from '../../data/ebayData';

const EbayFooter = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-10 pt-10 pb-6 font-sans text-xs text-[#555]">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            <h3 className="font-bold text-[#333] mb-3">{section}</h3>
                            <ul className="space-y-1">
                                {links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href="#" className="hover:underline">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div>
                        <h3 className="font-bold text-[#333] mb-3">Stay connected</h3>
                        <p className="mb-2">Facebook, Twitter, Instagram</p>
                    </div>
                </div>

                <div className="mt-10 pt-4 border-t border-gray-200 text-[11px] text-[#767676]">
                    <div className="flex flex-wrap gap-4 mb-2">
                        <a href="#" className="hover:underline">Copyright © 1995-2024 eBay Inc. All Rights Reserved.</a>
                        <a href="#" className="underline hover:no-underline">Accessibility</a>,
                        <a href="#" className="underline hover:no-underline">User Agreement</a>,
                        <a href="#" className="underline hover:no-underline">Privacy</a>,
                        <a href="#" className="underline hover:no-underline">Payments Terms of Use</a>,
                        <a href="#" className="underline hover:no-underline">Cookies</a>,
                        <a href="#" className="underline hover:no-underline">Your Privacy Choices</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default EbayFooter;
