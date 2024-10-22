import React, { useEffect, useState } from "react";
import ConstructionIcon from "@mui/icons-material/Construction";
import QRCode from "react-qr-code";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Button, Chip, Stack, TextField } from "@mui/material";
import { getInviteLink, sendFriendInvitation } from "../functions";
import { useTranslation } from "react-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";
const Friends = () => {
  const { t } = useTranslation();
  const [showQR, setShowQR] = useState(true);
  const [code, setCode] = useState(null);
  const [link, setLink] = useState("noLink");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
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
            paddingBottom: "10px",
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
            <div style={{ padding: "10px" }}>
              <QRCode
                size={256}
                style={{ height: "100%", width: "100%" }}
                value={link}
                viewBox={`0 0 256 256`}
              />

              <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
                <div
                  style={{
                    paddingBlockStart: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {`${t("Copy Link")}:\n${link}`}{" "}
                  </Button>
                  {copied && (
                    <p style={{ color: "green" }}>
                      {t("Link copied to clipboard!")}
                    </p>
                  )}
                </div>
              </CopyToClipboard>
            </div>
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
