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
import { encodeId } from "@/lib/utils";

const ShareButton = ({ offering }: { offering: any }) => {
	const offering_name = `${offering.name}`;

	const description = `Join me as a co-owner of this property so you can earn passive income & more, while also helping solve Nigeria's affordable housing scarcity. Click to learn more`;

	const shareTitle = `Become a co-owner of ${
		offering_name ? offering_name : "this property"
	} for as little as ₦1,000.`;

	const hashedId = encodeId(offering?.id);

	const shareUrl = `${
		import.meta.env.VITE_SITE_URL || window.location.origin
	}/offerings/${hashedId}`;

	// @ts-ignore
	const previewImage =
		offering?.images?.length > 0
			? offering?.images?.[0]
			: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9";

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
				title: `${shareTitle}\n\n${description}`,
			},
		},
		{
			component: WhatsappShareButton,
			icon: <FaWhatsapp className="text-green-500" />,
			label: "WhatsApp",
			props: {
				url: shareUrl,
				title: `*${shareTitle}*\n\n${description}`,
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
			props: { url: shareUrl, title: `${shareTitle}\n\n${description}` },
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
				<meta
					name="author"
					content={`Akara ${offering_name ? `| ${offering_name}` : ""} `}
				/>
				<meta property="og:title" content={shareTitle} />
				<meta property="og:description" content={description} />
				<meta property="og:image" content={previewImage} />
				<meta
					property="og:image:secure_url"
					itemProp="image"
					content={previewImage}
				/>
				<meta property="og:url" content={shareUrl} />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Akara" />

				<meta name="twitter:card" content={previewImage} />
				<meta name="twitter:title" content={shareTitle} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={previewImage} />
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
