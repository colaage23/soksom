import { ChevronLeft, Heart, MoveRight } from "lucide-react";
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
  favoriteId?: string;
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
  onFavoriteClick?: (item: CollectionPageItem) => void;
  isFavoritePending?: boolean;
};

const shortenRegion = (region: string) =>
  region.replace(/^제주특별자치도\s*/, "");

const PlaceCollectionPage = ({
  title,
  backLabel,
  stats,
  items,
  formatDateLabel,
  isLoading = false,
  emptyMessage = "표시할 장소가 없습니다.",
  onFavoriteClick,
  isFavoritePending = false,
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

  const countLabel = stats[0]?.value;

  return (
    <PageShell>
      <PageInner>
        <HeroSection>
          <BackButton type="button" onClick={() => navigate("/mypage")}>
            <ChevronLeft size={18} />
            {backLabel}
          </BackButton>

          <HeroTextGroup>
            <HeroTitle>{title}</HeroTitle>
            {countLabel && <StatValue>{countLabel}</StatValue>}
          </HeroTextGroup>
        </HeroSection>

        {isLoading ? (
          <PlacesGrid aria-busy="true">
            {Array.from({ length: 4 }).map((_, index) => (
              <PlaceCard key={`collection-skeleton-${index}`}>
                <PlaceVisual />
                <PlaceBody>
                  <PlaceMetaText>불러오는 중</PlaceMetaText>
                  <PlaceTitle>장소를 불러오고 있어요</PlaceTitle>
                  <PlaceRegion>잠시만 기다려 주세요.</PlaceRegion>
                </PlaceBody>
              </PlaceCard>
            ))}
          </PlacesGrid>
        ) : items.length === 0 ? (
          <EmptyStateCard>{emptyMessage}</EmptyStateCard>
        ) : (
          <PlacesGrid>
            {items.map((item) => {
              const Icon = item.icon;
              const uniqueTags = [...new Set(item.tags.filter(Boolean))];

              return (
                <PlaceCard key={item.contentId ?? item.title}>
                  <PlaceVisual>
                    {item.thumbnail ? (
                      <PlaceImage src={item.thumbnail} alt="" />
                    ) : (
                      <Icon size={34} />
                    )}
                  </PlaceVisual>

                  <PlaceBody>
                    <PlaceMetaText>
                      {formatDateLabel ? formatDateLabel(item.date) : item.date}
                    </PlaceMetaText>
                    <PlaceTitle>{item.title}</PlaceTitle>
                    <PlaceRegion>{shortenRegion(item.region)}</PlaceRegion>

                    <FooterRow>
                      <TagList>
                        {uniqueTags.map((tag) => (
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

                  <FavoriteButton
                    type="button"
                    $active={Boolean(item.isFavorite)}
                    disabled={isFavoritePending}
                    onClick={() => onFavoriteClick?.(item)}
                    aria-pressed={Boolean(item.isFavorite)}
                    aria-label={
                      item.isFavorite
                        ? `${item.title} 즐겨찾기 해제`
                        : `${item.title} 즐겨찾기 추가`
                    }
                  >
                    <Heart size={18} />
                  </FavoriteButton>
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
  padding: 32px 24px 96px;
  background: #f6f3ec;

  @media (max-width: 768px) {
    padding: 20px 16px 56px;
  }
`;

const PageInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  gap: 28px;
`;

const HeroSection = styled.section`
  display: grid;
  justify-items: start;
  gap: 20px;
  padding-bottom: 28px;
  border-bottom: 1px solid #e4ddcf;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: #6f6a60;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: #203029;
  }
`;

const HeroTextGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 12px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  color: #203029;
  font-family: Gowun Batang;
  font-size: clamp(1.875rem, 3vw, 2.25rem);
  font-weight: 700;
  line-height: 1.1;
`;

const StatValue = styled.span`
  color: #6f6a60;
  font-size: 1rem;
`;

const PlacesGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyStateCard = styled.article`
  padding: 40px 28px;
  border: 1px dashed #d8cfbe;
  border-radius: 22px;
  color: #6f6a60;
  font-size: 0.95rem;
  text-align: center;
`;

const PlaceCard = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  min-height: 252px;
  overflow: hidden;
  border: 1px solid #e4ddcf;
  border-radius: 22px;
  background: #fdfcf8;

  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(12, 151, 153, 0.5);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PlaceVisual = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #e8e2d4;
  color: ${colors.main};

  @media (max-width: 640px) {
    height: 180px;
  }
`;

const PlaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 22px;
`;

const PlaceMetaText = styled.span`
  color: #0c7f81;
  font-size: 0.8125rem;
  font-weight: 600;
`;

const PlaceTitle = styled.h2`
  margin: 0;
  padding-right: 56px;
  color: #203029;
  font-family: Gowun Batang;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.25;
`;

const PlaceRegion = styled.p`
  margin: 0;
  color: #6f6a60;
  font-size: 0.875rem;
`;

const FavoriteButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;

  border: 1px solid ${({ $active }) => ($active ? "#f77036" : "#e4ddcf")};
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#f77036" : "#fdfcf8")};
  color: ${({ $active }) => ($active ? "#fdfcf8" : "#6f6a60")};

  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  svg {
    fill: ${({ $active }) => ($active ? "currentColor" : "transparent")};
    transition: fill 0.2s ease;
  }

  &:hover {
    border-color: #f7703633;
    background: #f770362a;
    color: #f77036;
  }

  &:hover svg {
    fill: currentColor;
  }

  &:disabled {
    cursor: wait;
    opacity: 0.6;
  }
`;

const FooterRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 18px;
`;

const TagList = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 6px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 6px 12px;
  border-radius: 12px;
  background: rgba(12, 151, 153, 0.08);
  color: #0c7f81;
  font-size: 0.8125rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DetailButton = styled.button`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  gap: 6px;
  margin-left: auto;
  padding: 12px 24px;
  border: 0;
  border-radius: 19px;
  background: #203029;
  color: #fdfcf8;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease;

  svg {
    transition: transform 0.25s cubic-bezier(0.2, 0.6, 0.2, 1);
  }

  &:hover {
    background: #2d4239;
  }

  &:hover svg {
    transform: translateX(5px);
  }

  &:focus-visible {
    outline: 2px solid #203029;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }
  }
`;
