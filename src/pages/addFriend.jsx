import React, { useEffect, useState } from "react";
import ConstructionIcon from "@mui/icons-material/Construction";
import QRCode from "react-qr-code";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Chip, Stack, TextField } from "@mui/material";
import { getInviteLink, sendFriendInvitation } from "../functions";
import { useTranslation } from "react-i18next";
const Friends = () => {
  const { t } = useTranslation();
  const [showQR, setShowQR] = useState(true);
  const [code, setCode] = useState(null);
  const [link, setLink] = useState("noLink");
  const [text, setText] = useState("");
  useEffect(() => {
    async function getLink() {
      setLink(await getInviteLink());
    }
    getLink();
  }, []);

  const sendInvite = () => {
    sendFriendInvitation(code);
  };
  const sendInviteLink = () => {
    if (text.length > 30) sendFriendInvitation(code);
  };
  return (
    <>
      <div style={{ justifyContent: "center" }}>
        <div
          style={{
            width: "100%",
            paddingBottom: "1px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" apa onClick={() => setShowQR(!showQR)}>
            {showQR ? t("Scan friends QR or insert Link") : t("Show your QR")}
          </Button>
        </div>
        {showQR ? (
          <>
            <QRCode
              size={256}
              style={{ height: "100%", width: "100%" }}
              value={link}
              viewBox={`0 0 256 256`}
            />
            <div>{`${t("Your Link")} : ${link}`}</div>
          </>
        ) : (
          <>
            <Scanner onScan={(result) => setCode(result[0].rawValue)} />
            <div
              style={{
                width: "100%",
                paddingBottom: "1px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {code != null && (
                <>
                  <Stack spacing={1}>
                    <Chip label={code} />
                    <Button onClick={sendInvite} variant="contained">
                      {t("Send invitation")}
                    </Button>
                  </Stack>
                </>
              )}
              <Stack>
                <div style={{ margin: "30px" }}>
                  <TextField
                    label={t("Insert friend invite Link")}
                    onChange={(event) => {
                      setText(event.target.value);
                    }}
                  ></TextField>
                </div>
                <Button onClick={sendInviteLink} variant="contained">
                  {t("Send invitation for that link")}
                </Button>
              </Stack>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Friends;
