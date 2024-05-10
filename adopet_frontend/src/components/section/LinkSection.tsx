import * as MUI from "@mui/material";
import * as React from "react";
import NavBar from "../elements/NavBar";
import LinkBarNavigation from "../elements/LinkBarNavigation";

interface LinkNavigationProps {
  pages: string[];
  pageLinks: string[];
}

export default function LinkSection({ pages, pageLinks }: LinkNavigationProps) {
  const isSmallScreen = MUI.useMediaQuery((theme: MUI.Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <React.Fragment>
      {isSmallScreen ? (
        <NavBar pages={pages} pageLinks={pageLinks} />
      ) : (
        <LinkBarNavigation pages={pages} pageLinks={pageLinks} />
      )}
    </React.Fragment>
  );
}
