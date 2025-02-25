import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { convertFileToUrl } from "@/lib";
import { Input } from "@/components/ui/input";
import { EditProfile as EditProfileIcon, UserAvatar } from "@/constants/icons";
import { useUpdateProfilePictureMutation } from "@/server/actions/profile";
import { Loader } from "@/components/fallback/FallbackLoader";

function ProfilePic({ image }: { image?: string }) {
	const [_file, setFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

	const [updateProfilePicture, { isLoading }] =
		useUpdateProfilePictureMutation();

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];

		if (!selectedFile) return;
		if (
			!["image/jpeg", "image/jpg", "image/png", "image/svg+xml"].includes(
				selectedFile.type
			)
		) {
			toast.info("Please select a JPEG, JPG, PNG, or SVG file.");
			return;
		}
		if (selectedFile.size > 4 * 1024 * 1024) {
			toast.info("File size must be less than 4MB.");
			return;
		}

		let message;

		try {
			setFile(selectedFile);

			const formData = new FormData();
			formData.append("profile_picture", selectedFile);

			const res = await updateProfilePicture(formData);
			if (!res?.data?.picture_url) {
				message = res?.data?.message || "Failed to upload the profile picture.";
				throw new Error(message);
			}

			setPreview(convertFileToUrl(selectedFile));

			toast.success("Profile picture updated successfully!");
		} catch (error: any) {
			const message = error?.message;

			toast.error(message);
		}
	};

	const renderImage = () => {
		if (preview) {
			return (
				<div className="group relative size-40 sm:size-44 aspect-square rounded-full shadow max-sm:mx-auto">
					<img
						src={preview!}
						alt="profile"
						className="object-cover size-full drop-shadow-xl"
					/>
				</div>
			);
		}
		if (image) {
			return (
				<div className="group relative size-40 sm:size-44 aspect-square rounded-full shadow max-sm:mx-auto">
					<img
						src={image!}
						alt=""
						className="object-cover size-full drop-shadow-xl"
					/>
				</div>
			);
		}
		return (
			<div className="relative h-40 w-40">
				<UserAvatar className="w-fit h-full drop-shadow-xl" />
			</div>
		);
	};

	return (
		<div className="relative">
			{renderImage()}

			<Input
				id="uploadImage"
				type="file"
				accept="image/jpeg, image/png, image/svg+xml"
				onChange={handleFileChange}
				className="hidden"
			/>

			<Label
				htmlFor="uploadImage"
				className="cursor-pointer absolute bottom-0 right-5"
			>
				{isLoading ? (
					<div className="size-10 rounded-full grid place-items-center bg-secondary shadow">
						<Loader isLoading color="white" />
					</div>
				) : (
					<EditProfileIcon className="size-8 sm:size-10" />
				)}
			</Label>
		</div>
	);
}

export default ProfilePic;
