import { ArrowLeft, Heart, MapPinned, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../../constants/colors";

export type CollectionPageItem = {
  title: string;
  date: string;
  region: string;
  summary: string;
  badge: string;
  badgeVariant: "calm" | "warm";
  isFavorite?: boolean;
  tags: string[];
  primaryMeta: string;
  secondaryMeta: string;
  icon: React.ComponentType<{ size?: number }>;
  contentId?: string;
  thumbnail?: string;
};

type CollectionStat = {
  label: string;
  value: string;
};

type PlaceCollectionPageProps = {
  eyebrow: string;
  title: string;
  backLabel: string;
  stats: CollectionStat[];
  items: CollectionPageItem[];
  formatDateLabel?: (dateText: string) => string;
  isLoading?: boolean;
  emptyMessage?: string;
};

const PlaceCollectionPage = ({
  eyebrow,
  title,
  backLabel,
  stats,
  items,
  formatDateLabel,
  isLoading = false,
  emptyMessage = "표시할 장소가 없습니다.",
}: PlaceCollectionPageProps) => {
  const navigate = useNavigate();

  const handleMoveToExplore = (item: CollectionPageItem) => {
    const searchParams = new URLSearchParams();

    searchParams.set("keyword", item.title);

    if (item.contentId) {
      searchParams.set("contentId", item.contentId);
    }

    navigate({
      pathname: "/map",
      search: `?${searchParams.toString()}`,
    });
  };

  return (
    <PageShell>
      <PageInner>
        <HeroSection>
          <HeroTopRow>
            <BackButton type="button" onClick={() => navigate("/mypage")}>
              <ArrowLeft size={18} />
              {backLabel}
            </BackButton>
          </HeroTopRow>

          <HeroContent>
            <HeroTextGroup>
              <Eyebrow>{eyebrow}</Eyebrow>
              <HeroTitle>{title}</HeroTitle>
            </HeroTextGroup>

            <HeroStats $columns={stats.length}>
              {stats.map((stat) => (
                <StatCard key={stat.label}>
                  <StatLabel>{stat.label}</StatLabel>
                  <StatValue>{stat.value}</StatValue>
                </StatCard>
              ))}
            </HeroStats>
          </HeroContent>
        </HeroSection>

        {isLoading ? (
          <PlacesGrid>
            {Array.from({ length: 4 }).map((_, index) => (
              <PlaceCard key={`favorite-skeleton-${index}`}>
                <PlaceVisual $index={index}>
                  <PlaceBadge $variant="calm">불러오는 중</PlaceBadge>
                </PlaceVisual>
                <PlaceBody>
                  <PlaceHeader>
                    <PlaceHeaderTop>
                      <PlaceTitleGroup>
                        <PlaceMetaText>로딩 중</PlaceMetaText>
                        <PlaceTitle>
                          즐겨찾기 장소를 불러오고 있습니다.
                        </PlaceTitle>
                        <PlaceRegion>잠시만 기다려 주세요.</PlaceRegion>
                      </PlaceTitleGroup>
                    </PlaceHeaderTop>
                  </PlaceHeader>

                  <PlaceSummary>
                    저장된 장소 목록을 서버에서 조회하고 있습니다.
                  </PlaceSummary>
                </PlaceBody>
              </PlaceCard>
            ))}
          </PlacesGrid>
        ) : items.length === 0 ? (
          <EmptyStateCard>{emptyMessage}</EmptyStateCard>
        ) : (
          <PlacesGrid>
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <PlaceCard key={item.title}>
                  <PlaceVisual $index={index}>
                    <PlaceBadge $variant={item.badgeVariant}>
                      {item.badge}
                    </PlaceBadge>
                    {item.thumbnail ? (
                      <PlaceImage src={item.thumbnail} alt={item.title} />
                    ) : (
                      <Icon size={34} />
                    )}
                  </PlaceVisual>

                  <PlaceBody>
                    <PlaceHeader>
                      <PlaceHeaderTop>
                        <PlaceTitleGroup>
                          <PlaceMetaText>
                            {formatDateLabel
                              ? formatDateLabel(item.date)
                              : item.date}
                          </PlaceMetaText>
                          <PlaceTitle>{item.title}</PlaceTitle>
                          <PlaceRegion>{item.region}</PlaceRegion>
                        </PlaceTitleGroup>
                        <FavoriteButton
                          type="button"
                          $active={Boolean(item.isFavorite)}
                          aria-label={
                            item.isFavorite
                              ? `${item.title} 즐겨찾기 해제`
                              : `${item.title} 즐겨찾기 추가`
                          }
                        >
                          <Heart
                            size={18}
                            fill={item.isFavorite ? "currentColor" : "none"}
                          />
                        </FavoriteButton>
                      </PlaceHeaderTop>
                    </PlaceHeader>

                    <PlaceSummary>{item.summary}</PlaceSummary>

                    <MetaList>
                      <MetaItem>
                        <MapPinned size={16} />
                        <span>{item.region}</span>
                      </MetaItem>
                    </MetaList>

                    <FooterRow>
                      <TagList>
                        {item.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </TagList>

                      <DetailButton
                        type="button"
                        onClick={() => handleMoveToExplore(item)}
                      >
                        상세 보기
                        <MoveRight size={16} />
                      </DetailButton>
                    </FooterRow>
                  </PlaceBody>
                </PlaceCard>
              );
            })}
          </PlacesGrid>
        )}
      </PageInner>
    </PageShell>
  );
};

export default PlaceCollectionPage;

const PageShell = styled.div`
  min-height: calc(100vh - 72px);
  padding: 28px 20px 72px;
  background:
    radial-gradient(
      circle at top right,
      rgba(36, 149, 155, 0.18),
      transparent 24%
    ),
    radial-gradient(
      circle at top left,
      rgba(22, 63, 65, 0.08),
      transparent 30%
    ),
    linear-gradient(180deg, #f2f6f3 0%, #eef4f1 46%, #f7faf8 100%);

  @media (max-width: 768px) {
    padding: 16px 12px 48px;
  }
`;

const PageInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
`;

const HeroSection = styled.section`
  display: grid;
  gap: 22px;
  padding: 26px;
  border: 1px solid rgba(36, 149, 155, 0.1);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 22px 44px rgba(35, 49, 44, 0.06);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeroTopRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(36, 149, 155, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: #2b3a33;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 0.9fr);
  gap: 18px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroTextGroup = styled.div`
  display: grid;
  gap: 10px;
`;

const Eyebrow = styled.span`
  color: ${colors.main};
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.18em;
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: #203029;
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
`;

const HeroStats = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.article`
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 22px;
  background: linear-gradient(180deg, #f8fbf9 0%, #eff6f2 100%);
  border: 1px solid rgba(36, 149, 155, 0.08);
`;

const StatLabel = styled.span`
  color: #7d8b85;
  font-size: 0.86rem;
  font-weight: 700;
`;

const StatValue = styled.strong`
  color: #21312a;
  font-size: 1.4rem;
`;

const PlacesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyStateCard = styled.article`
  padding: 40px 28px;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 22px 40px rgba(35, 49, 44, 0.05);
  color: #52615a;
  font-size: 0.98rem;
  font-weight: 600;
  text-align: center;
`;

const PlaceCard = styled.article`
  display: grid;
  grid-template-columns: 148px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgba(36, 149, 155, 0.08);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 22px 40px rgba(35, 49, 44, 0.05);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PlaceVisual = styled.div<{ $index: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 220px;
  background: ${({ $index }) =>
    $index % 2 === 0
      ? "linear-gradient(160deg, rgba(36, 149, 155, 0.2), rgba(36, 149, 155, 0.04))"
      : "linear-gradient(160deg, rgba(22, 63, 65, 0.18), rgba(240, 247, 244, 0.08))"};
  color: ${colors.main};
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceBadge = styled.span<{ $variant: "calm" | "warm" }>`
  position: absolute;
  top: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: ${({ $variant }) =>
    $variant === "calm"
      ? "rgba(36, 149, 155, 0.14)"
      : "rgba(242, 170, 76, 0.18)"};
  color: ${({ $variant }) => ($variant === "calm" ? colors.main : "#b96a0d")};
  font-size: 0.84rem;
  font-weight: 800;
`;

const PlaceBody = styled.div`
  display: grid;
  gap: 18px;
  padding: 22px;
`;

const PlaceHeader = styled.div`
  display: grid;
  gap: 10px;
`;

const PlaceHeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 640px) {
    align-items: center;
  }
`;

const PlaceTitleGroup = styled.div`
  display: grid;
  gap: 6px;
`;

const PlaceTitle = styled.h2`
  margin: 0;
  color: #203029;
  font-size: 1.32rem;
`;

const PlaceRegion = styled.p`
  margin: 0;
  color: #809089;
  font-size: 0.92rem;
`;

const PlaceMetaText = styled.span`
  color: ${colors.main};
  font-size: 0.88rem;
  font-weight: 800;
`;

const FavoriteButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(212, 83, 106, 0.2)" : "rgba(36, 149, 155, 0.12)"};
  border-radius: 999px;
  background: ${({ $active }) =>
    $active ? "rgba(212, 83, 106, 0.12)" : "rgba(255, 255, 255, 0.92)"};
  color: ${({ $active }) => ($active ? "#d4536a" : "#8a9791")};
  box-shadow: 0 10px 18px rgba(35, 49, 44, 0.06);
  cursor: pointer;
`;

const PlaceSummary = styled.p`
  margin: 0;
  color: #55655f;
  font-size: 0.96rem;
  line-height: 1.7;
`;

const MetaList = styled.div`
  display: grid;
  gap: 10px;
`;

const MetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #60706a;
  font-size: 0.9rem;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(36, 149, 155, 0.08);
  color: ${colors.main};
  font-size: 0.84rem;
  font-weight: 700;
`;

const DetailButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 14px;
  border: 0;
  border-radius: 999px;
  background: #203029;
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
`;
