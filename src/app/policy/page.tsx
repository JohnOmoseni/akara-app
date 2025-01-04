import { privacyPolicy } from "@/constants";
import Header from "@/layouts/Header";

function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="bg-gradient-hero min-h-[35vh] max-h-[250px]  grid place-items-center px-6 py-6 sm:py-4 text-foreground-variant">
        <h1 className="text-white text-center max-w-[30ch]">Privacy Policy</h1>
      </div>

      <main className="w-full py-7 px-4 sm:pt-12 sm:px-[5%] pb-[2rem] sm:pb-[6rem]">
        <div className="flex-column gap-6 md:gap-10">
          <p className="pr-1">
            {privacyPolicy[0]?.introduction &&
              privacyPolicy[0]?.introduction.split("\n").map((line, index) =>
                line.trim() !== "" ? (
                  <p key={index} className="">
                    {line}
                  </p>
                ) : (
                  <br key={index} />
                )
              )}
          </p>

          <div className="flex-column gap-6">
            {privacyPolicy.slice(1).map((paragraph, idx) => {
              return (
                <div
                  key={idx}
                  className="flex-column sm:grid grid-cols-[minmax(auto,_200px)_1fr] gap-x-4 gap-y-3"
                >
                  <h3 className="font-bold text-[1rem]">{paragraph?.label}</h3>

                  <p className="pr-2">
                    {paragraph?.body &&
                      paragraph?.body
                        .split("\n")
                        .map((line, index) =>
                          line.trim() !== "" ? <p key={index}>{line}</p> : <br key={index} />
                        )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default PrivacyPolicy;
