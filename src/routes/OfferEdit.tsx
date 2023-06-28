import { Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrentOffer } from "../hooks/useCurrentOffer";
import { useLoadOffer } from "../hooks/useLoadOffer";
import { AppDispatch } from "../store";
import { setOfferProp } from "../store/offerReducer";
import OfferCustomer from "../components/OfferCustomer";
import ServicesWidget from "../components/shared/services-widget/ServicesWidget";
import { TabPanel } from "../components/shared/TabPanel";

export default function OfferEdit() {
  useLoadOffer();

  const [value, setValue] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const currentOffer = useCurrentOffer();

  const updateOfferServices = useCallback(
    (offerServices: OfferService[]) => {
      dispatch(setOfferProp({ path: ["offerServices"], value: offerServices }));
    },
    [dispatch]
  );

  if (!currentOffer) {
    return null;
  }

  const offerServices = currentOffer?.offerServices;

  return (
    <>
      <Tabs
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        <Tab label="Kunde"></Tab>
        <Tab label="Leistungen"></Tab>
      </Tabs>
      <TabPanel index={0} value={value}>
        <OfferCustomer />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <ServicesWidget
          offerServices={offerServices}
          title={"Im Angebot enthalten"}
          update={updateOfferServices}
        />
      </TabPanel>
    </>
  );
}
