import * as React from "react";
import * as MUI from "@mui/material";
import * as Router from "react-router-dom";

interface LinkItemProps extends React.ComponentPropsWithoutRef<typeof MUI.Link> {
  pages: string[];
  pageLinks: string[];
}

export default function LinkItem({
  pages,
  pageLinks,
  ...props
}: LinkItemProps) {
  return (
    <React.Fragment>
      {pages.map((page) => (
        <MUI.MenuItem sx={{ padding: "0px" }} key={page}>
          <MUI.Link
            component={Router.Link}
            to={pageLinks[pages.indexOf(page)]}
            {...props}
          >
            {page}
          </MUI.Link>
        </MUI.MenuItem>
      ))}
    </React.Fragment>
  );
}
