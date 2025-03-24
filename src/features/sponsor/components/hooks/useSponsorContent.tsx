import { useEffect, useMemo, useState } from "react";
import { TypeSponsorSkeleton } from "../../../../../generated/type";
import { Entry } from "contentful";
import { useContentfulClient } from "../../../../hooks/useContentfulClient";

export const useSponsorContent = () => {
    const [entries, setEntries] = useState<Entry<TypeSponsorSkeleton, undefined, string>[]>([]);
  const client = useContentfulClient();

  const latestYear = useMemo(() => {
    const allYears = entries.flatMap(entry => entry.fields.sponsorYears?.map(year => parseInt(year, 10)));
    const validYears = allYears.filter(a => a != null);

    return validYears.length ? Math.max(...validYears) : 2025;
  }, [entries]);


  const currentYearEntries = useMemo(() => entries.filter(item => item.fields.sponsorYears?.includes(latestYear.toString() as any)), [entries, latestYear])
  const prevYearEntires = useMemo(() => entries.filter(item => item.fields.sponsorYears?.includes((latestYear - 1).toString() as any)), [entries, latestYear])

  const fetchEntries = async (): Promise<void> => {
    client
      .getEntries<TypeSponsorSkeleton>({
        content_type: "sponsor",
        order: ["-sys.createdAt"],
      })
      .then((res) => {
        setEntries(res.items);
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchEntries();
  }, [])

    return { currentYearEntries, prevYearEntires,  latestYear };
}
