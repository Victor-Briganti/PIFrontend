import * as React from "react";
import * as MUI from "@mui/material";

interface MenuLinkBarNavProps {
  pages: string[];
  pageLinks: string[];
}

export default function MenuLinkBarNav({
  pages,
  pageLinks,
}: MenuLinkBarNavProps) {
  return (
    <React.Fragment>
      {pages.map((page) => (
        <MUI.MenuItem sx={{ padding: "0px" }} key={page}>
          <MUI.Link
            textAlign="center"
            href={pageLinks[pages.indexOf(page)]}
            width={"100%"}
            sx={{ px: "14px" }}
            underline="none"
            color="white"
            fontFamily="monospace"
          >
            {page}
          </MUI.Link>
        </MUI.MenuItem>
      ))}
    </React.Fragment>
  );
}
