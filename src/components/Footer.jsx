
const footerPages = [
    { text: "FAQ", link: "#0" },
    { text: "Help Center", link: "#0" },
    { text: "Account", link: "#0" },
    { text: "Media Center", link: "#0" },
    { text: "Investor Relations", link: "#0" },
    { text: "Jobs", link: "#0" },
    { text: "Redeem Gift Cards", link: "#0" },
    { text: "Buy Gift Cards", link: "#0" },
    { text: "Ways to Watch", link: "#0" },
    { text: "Terms of Use", link: "#0" },
    { text: "Privacy", link: "#0" },
    { text: "Cookie Preferences", link: "#0" },
    { text: "Corporate Information", link: "#0" },
    { text: "Contact Us", link: "#0" },
    { text: "Speed Test", link: "#0" },
    { text: "Legal Notices", link: "#0" },
    { text: "Only on Notflicks", link: "#0" },
    { text: "Do Not Sell or Share My Personal Information", link: "#0" },
]

function Footer() {
    return (
        <>
            <div className="mt-16 h-2 bg-gray-800"></div>
            <div className="mt-8 p-10 text-gray-500 w-[90%] mx-auto">
                <div className="mb-8">Questions? Call 1-844-XXX-XXXX</div>
                <div className="grid justify-around grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-2 text-sm">
                    {footerPages.map((page) => (
                        <div key={page.text}><a className="hover:underline" href={page.link}>{page.text}</a></div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Footer;