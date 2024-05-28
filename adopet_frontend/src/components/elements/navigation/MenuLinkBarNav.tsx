import * as React from "react";
import * as MUI from "@mui/material";
import * as Router from "react-router-dom";

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
            width={"100%"}
            sx={{ px: "14px" }}
            underline="none"
            color="white"
            fontFamily="monospace"
            component={Router.Link}
            to={pageLinks[pages.indexOf(page)]}
          >
            {page}
          </MUI.Link>
        </MUI.MenuItem>
      ))}
    </React.Fragment>
  );
}
