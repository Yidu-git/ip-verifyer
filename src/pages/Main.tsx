import { useEffect, useState } from "react";

const MainPage = () => {
  const [IP, setIP] = useState("");
  const [IPDetails, setIPDetails] = useState({
    valid: true,
    error: "",
    IP: "",
    Type: "",
    Class: "",
  });

  useEffect(() => {
    const validateIPv4 = (ip: string) => {
      const octates = ip.split(".");
      //   console.log(octates.length);
      //   console.log(IPDetails.valid);

      if (IP === "") return;

      setIPDetails((prev) => ({
        ...prev,
        valid: true,
        IP: IP,
      }));

      if (octates.length !== 4) {
        setIPDetails((prev) => ({
          ...prev,
          valid: false,
          error: "IPv4 Must have 4 octates",
        }));
        return;
      }
      for (let i = 0; i < octates.length - 1; i++) {
        console.log(octates[i]);
        console.log(i);
        if (Number(octates[i]) > 255) {
          setIPDetails((prev) => ({
            ...prev,
            valid: false,
            error: `Octate ${i + 1} (${octates[i]}) out of range (0-255)`,
          }));
        }

        if (!/^\d+$/.test(octates[i])) {
          setIPDetails((prev) => ({
            ...prev,
            valid: false,
            error: `Non numerical value detected at octate ${i + 1} (${octates[i]}).`,
          }));
          return;
        }
      }

      const [a, b] = octates.map(Number);
      let type = "Public";
      let Class = "";

      if (a === 10) {
        type = "Private";
        Class = "A";
      } else if (a === 172 && b >= 16 && b <= 31) {
        type = "Private";
        Class = "B";
      } else if (a === 192 && b === 168) {
        type = "Private";
        Class = "C";
      } else if (a === 127) type = "Loopback";

      setIPDetails((prev) => ({
        ...prev,
        valid: true,
        IP: IP,
        Type: type,
      }));
      //   return;
    };

    validateIPv4(IP);

    // setIPDetails({
    //   ...IPDetails,
    //   IP: IP,
    // });
  }, [IP]);

  return (
    <div className="">
      <div>
        <h1 className="mt-4 pt-10">IP Identifier</h1>
        <input
          type="text"
          value={IP}
          onChange={(e) => setIP(e.target.value)}
          className="border-accent-border font-white focus:outline-accent rounded-sm border px-3 py-1 text-xl text-white focus:outline-2"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center pt-10">
        {!IPDetails.valid && (
          <h3 className="pb-5 text-2xl text-red-400">{IPDetails.error}</h3>
        )}
        <div className="flex w-100 flex-row">
          <div className="bg-red h-fit w-full">
            <p>IP</p>
            <p>Type</p>
            <p>Class</p>
          </div>
          <div className="bg-red h-fit w-full">
            <p>{IPDetails.IP}</p>
            <p>{IPDetails.Type}</p>
            <p>{IPDetails.Class}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
