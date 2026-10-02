import type { InfoItem } from "./GuideData";
import { Card, CardDesc, CardTitle, IconBox, type Tone } from "./Guide.styles";

interface InfoCardProps {
  item: InfoItem;
  tone?: Tone;
}

const InfoCard = ({
  item: { icon: Icon, title, description },
  tone = "teal",
}: InfoCardProps) => (
  <Card $tone={tone}>
    <IconBox $tone={tone}>
      <Icon size={18} aria-hidden />
    </IconBox>
    <CardTitle>{title}</CardTitle>
    <CardDesc>{description}</CardDesc>
  </Card>
);

export default InfoCard;
