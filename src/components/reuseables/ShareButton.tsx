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

const ShareButton = ({ offering }: { offering: any }) => {
	const shareTitle = `Check out this offering: ${offering.name}`;
	const shareUrl = `${window.location.origin}/offering/${offering.id}`;

	const list = [
		<FacebookShareButton
			url={shareUrl}
			className="flex items-center gap-2 p-2 w-max"
		>
			<FaFacebook className="text-blue-600" />{" "}
			<span className="mt-px">Facebook</span>
		</FacebookShareButton>,

		<TwitterShareButton
			url={shareUrl}
			title={shareTitle}
			className="flex items-center gap-2 p-2 w-max"
		>
			<FaTwitter className="text-blue-400" />{" "}
			<span className="mt-px">Twitter</span>
		</TwitterShareButton>,

		<WhatsappShareButton
			url={shareUrl}
			title={shareTitle}
			separator=" - "
			className="flex items-center gap-2 p-2 w-max"
		>
			<FaWhatsapp className="text-green-500" />{" "}
			<span className="mt-px">WhatsApp</span>
		</WhatsappShareButton>,

		<LinkedinShareButton
			url={shareUrl}
			title={shareTitle}
			className="flex items-center gap-2 p-2 w-max"
		>
			<FaLinkedin className="text-blue-700" />{" "}
			<span className="mt-px">LinkedIn</span>
		</LinkedinShareButton>,

		<TelegramShareButton
			url={shareUrl}
			title={shareTitle}
			className="flex items-center gap-2 p-2 w-max"
		>
			<FaTelegram className="text-blue-500" />{" "}
			<span className="mt-px">Telegram</span>
		</TelegramShareButton>,

		<EmailShareButton
			url={shareUrl}
			subject={shareTitle}
			body="Check out this amazing offering: "
			className="flex items-center gap-2 p-2 w-max"
		>
			<FaEnvelope className="text-gray-600" />{" "}
			<span className="mt-px">Email</span>
		</EmailShareButton>,
	];

	return (
		<>
			<PopoverComponent
				trigger={
					<div className="row-flex-start gap-2 px-3 py-2 transition">
						<FaShareAlt />
						Share
					</div>
				}
				list={list}
				renderItem={(item) => {
					return item;
				}}
			/>
		</>
	);
};

export default ShareButton;
