import SectionWrapper from "@/layouts/SectionWrapper";
import ProfileInfo from "./ProfileInfo";
import Balance from "./Balance";

function Profile() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-[4%] card !p-1 max-w-7xl mx-auto">
        <div className="col-span-1">
          <Balance />
        </div>

        <div className="col-span-1">
          <ProfileInfo />
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Profile;
