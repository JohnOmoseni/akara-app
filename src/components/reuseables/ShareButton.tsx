import {
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	LinkedinShareButton,
	TelegramShareButton,
	EmailShareButton,
} from "react-share";
import {
	FaFacebook,
	FaTwitter,
	FaWhatsapp,
	FaLinkedin,
	FaTelegram,
	FaEnvelope,
	FaShareAlt,
} from "react-icons/fa";
import { PopoverComponent } from "../ui/components/PopoverComponent";
import { Helmet } from "react-helmet-async";

const ShareButton = ({ offering }: { offering: any }) => {
	const offering_name = `${offering.name} ${
		offering.area ? "(" + offering.area + ")" : ""
	} `;

	const description = `Join me as a co-owner of this property so you can earn rental income and grow your wealth, while also helping solve the affordable housing crisis affecting everyone. Click the link to learn more`;

	const shareTitle = `Be a co-owner of ${
		offering_name ? offering_name : "this property"
	} for as litle as ₦1,000.`;

	const shareUrl = `${
		import.meta.env.VITE_SITE_URL || window.location.origin
	}/offerings/${offering?.id || ""}`;

	// @ts-ignore
	const previewImage = offering?.images?.[0]
		? offering?.images?.[0]
		: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=300&auto=format&fit=crop";

	// Social Share Config
	const socialPlatforms = [
		{
			component: FacebookShareButton,
			icon: <FaFacebook className="text-blue-600" />,
			label: "Facebook",
			props: { url: shareUrl, quote: shareTitle },
		},
		{
			component: TwitterShareButton,
			icon: <FaTwitter className="text-blue-400" />,
			label: "Twitter",
			props: {
				url: shareUrl,
				hashtag: "#AffordableHousing",
				title: `${shareTitle} \n \n${description}`,
			},
		},
		{
			component: WhatsappShareButton,
			icon: <FaWhatsapp className="text-green-500" />,
			label: "WhatsApp",
			props: {
				url: shareUrl,
				title: `*${shareTitle}* \n \n${description}`,
				separator: " - ",
			},
		},
		{
			component: LinkedinShareButton,
			icon: <FaLinkedin className="text-blue-700" />,
			label: "LinkedIn",
			props: { url: shareUrl, title: shareTitle, summary: description },
		},
		{
			component: TelegramShareButton,
			icon: <FaTelegram className="text-blue-500" />,
			label: "Telegram",
			props: { url: shareUrl, title: `${shareTitle} \n \n${description}` },
		},
		{
			component: EmailShareButton,
			icon: <FaEnvelope className="text-gray-600" />,
			label: "Email",
			props: { url: shareUrl, subject: shareTitle, body: description },
		},
	];
	return (
		<>
			{/* OpenGraph Meta Tags */}
			<Helmet>
				<meta property="og:title" content={shareTitle} />
				<meta property="og:description" content={description} />
				<meta
					property="og:image"
					content={
						offering.images?.[0] ||
						"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=300&auto=format&fit=crop"
					}
				/>
				<meta property="og:url" content={shareUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Akara" />

				<meta
					name="twitter:card"
					content={
						offering.images?.[0] ||
						"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=300&auto=format&fit=crop"
					}
				/>
				<meta name="twitter:title" content={shareTitle} />
				<meta name="twitter:description" content={description} />
				<meta
					name="twitter:image"
					content={
						offering.images?.[0] ||
						"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=300&auto=format&fit=crop"
					}
				/>
			</Helmet>
			<PopoverComponent
				trigger={
					<div className="row-flex-start gap-2 px-1 py-2 transition">
						<FaShareAlt />
						Share
					</div>
				}
				list={socialPlatforms.map(
					({ component: ShareComp, icon, label, props }, index) => (
						<ShareComp
							key={index}
							{...props}
							className="flex items-center gap-2 p-2 w-max"
						>
							{icon} <span className="mt-px">{label}</span>
						</ShareComp>
					)
				)}
				renderItem={(item) => {
					return item;
				}}
			/>
		</>
	);
};

export default ShareButton;
