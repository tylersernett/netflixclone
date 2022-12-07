
const footerPages = [
    { text: "FAQ", link: "/" },
    { text: "Help Center", link: "/" },
    { text: "Account", link: "/" },
    { text: "Media Center", link: "/" },
    { text: "Investor Relations", link: "/" },
    { text: "Jobs", link: "/" },
    { text: "Redeem Gift Cards", link: "/" },
    { text: "Buy Gift Cards", link: "/" },
    { text: "Ways to Watch", link: "/" },
    { text: "Terms of Use", link: "/" },
    { text: "Privacy", link: "/" },
    { text: "Cookie Preferences", link: "/" },
    { text: "Corporate Information", link: "/" },
    { text: "Contact Us", link: "/" },
    { text: "Speed Test", link: "/" },
    { text: "Legal Notices", link: "/" },
    { text: "Only on Netflix", link: "/" },
    { text: "Do Not Sell or Share My Personal Information", link: "/" },
]

function Footer() {
    return (
        <>
            <div className="mt-16 h-2 bg-gray-800"></div>
            <div className="mt-8 p-10 text-gray-500 w-[90%] mx-auto">
                <div className="mb-8">Questions? Call 1-844-505-2993</div>
                <div className="grid justify-around grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-2 text-sm">
                    {footerPages.map((page) => (
                        <div><a className="hover:underline" href={page.link}>{page.text}</a></div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Footer;