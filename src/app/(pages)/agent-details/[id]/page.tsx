import BreadcrumbArea from "@/components/Breadcrumb/BreadcrumbArea";
import { propertyData } from "@/data/propertyData";
import Wrapper from "@/layouts/Wrapper";
import { PageParamsProps } from "@/types/custom-interface";
import type { Metadata } from "next";

export async function generateMetadata(
  props: PageParamsProps,
): Promise<Metadata> {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;
  const property = propertyData.find((item) => item.id == Number(id));
  return {
    title: property?.title ? property.title : "Agent Details",
  };
}

export default async function AgentDetails(props: PageParamsProps) {
  const resolvedParams = await props.params;
  const { id } = resolvedParams;

  return (
    <Wrapper>
      <main>
        <BreadcrumbArea title={`Agent Details${id ? ` - ${id}` : ""}`} />
      </main>
    </Wrapper>
  );
}
