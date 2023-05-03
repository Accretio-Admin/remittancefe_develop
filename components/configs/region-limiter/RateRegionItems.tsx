import Image from "next/image";
import React from "react";
import { IRateLimiterRegionItem } from "../../../interfaces/rate_limiter/IRateLimiter.interface";
import { LocalStorageAuthService } from "../../../services/LocalStorageService";
import UserAccessGuardComponentComponent from "../../customs/UserAccessGuardComponent";
import { HighlightOffIcon } from "../../mui";

const RateRegionItemsComponent = ({
  countryCode,
  flag,
  onClickForRemoveRegion,
}: IRateLimiterRegionItem) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return (
    <div className="bg-nsConcrete1 p-1 flex items-center justify-between flex-row border border-nsBlack1/40 shadow-nsTwo border-solid rounded-nsMd h-[49px] my-2 mr-5 ">
      <Image
        src={flag}
        width="33"
        className="rounded-nsFull object-cover mx-2"
        height="33"
        alt={countryCode}
      />
      <p className="capitalize m-0 p-0 text-sm">
        {regionNames.of(countryCode.toUpperCase())}
      </p>
      <div className="flex justify-start h-full mt-1">
        <UserAccessGuardComponentComponent
          showOrHidden={
            LocalStorageAuthService().getUserAccessLevels().rateLimiter.listing
              .delete.main
          }
        >
          <HighlightOffIcon
            fontSize="small"
            className="hover:cursor-pointer ml-2"
            onClick={onClickForRemoveRegion}
          />
        </UserAccessGuardComponentComponent>
      </div>
    </div>
  );
};

export default RateRegionItemsComponent;
