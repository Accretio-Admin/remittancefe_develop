import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { iCrumbBreadCrumb } from "../../interfaces/breadcrumbs/IBreadcrumbs.interface";
import LinksCustom from "../customs/LinksCustom";
import { styled ,Breadcrumbs} from "../mui/index";
const BreadcrumbsCustom = styled(Breadcrumbs)({
  "& .MuiBreadcrumbs-li":{
    fontWeight:"bold",
    textTransform:"capitalize"
  },
  "& .MuiBreadcrumbs-separator ":{
    fontSize:"26px",
    fontWeight:"600",
    lineHeight:"0"
  }
});
const NextBreadcrumbsComponent = () => {
  const router = useRouter();
  const breadcrumbs = useMemo(
    function generateBreadcrumbs() {
      const asPathWithoutQuery = router.asPath.split("?")[0];
      const asPathNestedRoutes = asPathWithoutQuery
        .split("/")
        .filter((v) => v.length > 0);

      const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
        return { href, text: subpath };
      });

      return [...crumblist];
    },
    [router.asPath]
  );
  return (
    <BreadcrumbsCustom separator="›" aria-label="breadcrumb">
      {breadcrumbs.map((crumb, idx) => (
        <Crumb {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
      ))}
    </BreadcrumbsCustom>
  );
};
export default NextBreadcrumbsComponent;
const Crumb = ({ text, href, last = false }: iCrumbBreadCrumb) => {
  if (last) {
    return <p className="text-bold m-0 cursor-default text-nsBlack1">{text}</p>;
  }
  return <LinksCustom nameLink={text} href={href} />;
};
