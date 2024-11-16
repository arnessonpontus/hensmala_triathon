import { useEffect, useState } from "react";
import { TypeSponsorSkeleton } from "../../../../../generated/type";
import { Entry } from "contentful";
import { useContentfulClient } from "../../../../hooks/useContentfulClient";

export const useSponsorContent = () => {
    const [entries, setEntries] = useState<Entry<TypeSponsorSkeleton, undefined, string>[]>([]);
  const client = useContentfulClient();

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

    return entries;
}
