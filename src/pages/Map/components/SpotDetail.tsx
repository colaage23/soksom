import styled from "styled-components";
import {
  CalendarPlus,
  CalendarX,
  Check,
  Clock,
  Globe,
  Heart,
  MoveLeft,
  Phone,
  Share2,
  Sparkles,
  Ticket,
  Toilet,
} from "lucide-react";
import { useState } from "react";
import { useSpotStore } from "../../../stores/useSpotStore";
import { useLikedSpotStore } from "../../../stores/useLikedSpotStore";
import { useWayPointStore } from "../../../stores/useWayPointStore";
import { useGetSpotDetail } from "../../../hooks/spot/useGetSpotDetail";
import type { ISpotDetailInfo } from "../../../types/spot";

const ROOM_AMENITIES: { key: keyof ISpotDetailInfo; label: string }[] = [
  { key: "roomaircondition", label: "에어컨" },
  { key: "roomtv", label: "TV" },
  { key: "roominternet", label: "인터넷" },
  { key: "roombat", label: "욕조" }, // ⚠️ types/spot.ts엔 roombath가 아니라 roombat으로 정의돼 있어서 맞춰줌
  { key: "roombathfacility", label: "욕실용품" },
  { key: "roomhairdryer", label: "헤어드라이어" },
  { key: "roomrefrigerator", label: "냉장고" },
  { key: "roomcook", label: "취사시설" },
  { key: "roomcable", label: "케이블TV" },
  { key: "roomtable", label: "테이블" },
  { key: "roomsofa", label: "소파" },
  { key: "roompc", label: "PC" },
  { key: "roomhometheater", label: "홈시어터" },
  { key: "roomtoiletries", label: "세면도구" },
];

const SpotDetail = () => {
  const { setDetailSpot, selectedSpot } = useSpotStore();
  const { likedSpot, toggleLikedSpot } = useLikedSpotStore();
  const { toggleWayPoint, isSelected } = useWayPointStore();

  const { data: spotDetail } = useGetSpotDetail({
    contentId: selectedSpot?.contentid ?? "",
    contentTypeId: selectedSpot?.contenttypeid,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  if (!spotDetail) return null;

  // const status = congestionStyle[spotDetail.congestion];
  const isLongText = spotDetail?.common.overview?.length > 80;

  // 콘텐츠 타입(관광지/쇼핑/음식점 등)에 따라 intro 필드명이 다르게 내려와서 통일
  const useTimeInfo = spotDetail?.intro.usetime || spotDetail?.intro.opentime;
  const parkingInfo =
    spotDetail?.intro.parking || spotDetail?.intro.parkingshopping;
  const restDateInfo =
    spotDetail?.intro.restdate || spotDetail?.intro.restdateshopping;
  const infoCenterInfo =
    spotDetail?.intro.infocenter || spotDetail?.intro.infocentershopping;
  const saleItemInfo = spotDetail?.intro.saleitem;
  const restroomInfo = spotDetail?.intro.restroom;
  const homepageInfo = spotDetail?.common.homepage;
  // homepage는 API마다 형태가 달라서 두 케이스 모두 처리:
  // 1) <a href="...">...</a> 형태의 HTML 문자열
  // 2) "http://..." 같은 순수 URL 문자열
  const homepageUrl =
    homepageInfo?.match(/href=["']([^"']+)["']/)?.[1] ||
    (homepageInfo?.startsWith("http") ? homepageInfo : undefined);

  // 문자열 안의 전화번호를 tel: 링크로 감싸서 실제 전화 연결 가능하게 처리
  const linkifyPhoneNumbers = (html?: string) => {
    if (!html) return html;
    return html.replace(
      /(\d{2,4}-\d{3,4}-\d{4})/g,
      (match) => `<a href="tel:${match.replace(/-/g, "")}">${match}</a>`,
    );
  };

  // 숙박(contenttypeid: 32)은 info[] 안에 infoname/infotext가 아니라
  // roomtitle 등 객실 전용 필드가 내려오므로 별도 카드로 렌더링
  const isRoomInfo = spotDetail?.info?.some((item) => !!item.roomtitle);

  const handleAddToPlan = () => {
    if (selectedSpot) toggleWayPoint(selectedSpot);
  };

  return (
    <SpotDetailContainer>
      <SpotHeaderWrapper>
        <SpotImage draggable={false} src={spotDetail?.common.firstimage} />

        <SpotActions>
          <IconButton onClick={() => setDetailSpot(null)}>
            <BackIcon />
          </IconButton>

          <RightGroup>
            <IconButton
              $active={likedSpot.includes(spotDetail.common.contentid)}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                toggleLikedSpot(spotDetail.common.contentid);
              }}
            >
              <LikeIcon
                $active={likedSpot.includes(spotDetail.common.contentid)}
              />
            </IconButton>
            {/* 공유한다고 하면 어떤 형태? */}
            <IconButton>
              <ShareIcon />
            </IconButton>
          </RightGroup>
        </SpotActions>

        <SpotHeader>
          <SpotName>{spotDetail?.common.title}</SpotName>
          <SpotAddress>{spotDetail?.common.addr1}</SpotAddress>
        </SpotHeader>
      </SpotHeaderWrapper>

      <SpotContent>
        {/* <CongestionBox>
          <CongestionTitle>
            <span>혼잡도</span>
            <CongestionBadge
              style={{
                backgroundColor:
                  spotDetail.congestion === "혼잡"
                    ? status.bgColor
                    : `${status.bgColor}65`,
                color: status.color,
              }}
            >
              {status.label}
            </CongestionBadge>
          </CongestionTitle>
          <CongestionProgressBar>
            <CongestionProgressFill
              style={{
                backgroundColor: status.bgColor,
                width: `${status.progress}%`,
              }}
            />
          </CongestionProgressBar>

          <CongestionText>
            <span>0%</span>
            <span>100%</span>
          </CongestionText>

          <CongestionDescription>{status.description}</CongestionDescription>
        </CongestionBox> */}

        <OverviewBox>
          <OverviewTitle>상세 정보</OverviewTitle>
          <OverviewDescription $expanded={isExpanded}>
            {spotDetail?.common.overview}
          </OverviewDescription>
          {isLongText && (
            <MoreButton onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? "접기" : "더보기"}
            </MoreButton>
          )}
        </OverviewBox>

        <InfoContainer>
          <InfoBox style={{ gridColumn: "1 / -1" }}>
            <InfoIconBadge>
              <ClockIcon />
            </InfoIconBadge>
            <InfoTitle>이용 시간</InfoTitle>
            <InfoText
              dangerouslySetInnerHTML={{
                __html: useTimeInfo || "-",
              }}
            />
          </InfoBox>

          {parkingInfo && (
            <InfoBox>
              <InfoIconBadge>
                <TicketIcon />
              </InfoIconBadge>
              <InfoTitle>주차</InfoTitle>
              <InfoText>{parkingInfo}</InfoText>
            </InfoBox>
          )}

          {restDateInfo && (
            <InfoBox>
              <InfoIconBadge>
                <CalendarXIcon />
              </InfoIconBadge>
              <InfoTitle>휴무일</InfoTitle>
              <InfoText
                dangerouslySetInnerHTML={{ __html: restDateInfo || "-" }}
              />
            </InfoBox>
          )}

          {infoCenterInfo && (
            <InfoBox style={{ gridColumn: "1 / -1" }}>
              <InfoIconBadge>
                <PhoneIcon />
              </InfoIconBadge>
              <InfoTitle>문의처</InfoTitle>
              <InfoText
                dangerouslySetInnerHTML={{
                  __html: linkifyPhoneNumbers(infoCenterInfo) || "",
                }}
              />
            </InfoBox>
          )}

          {restroomInfo && (
            <InfoBox>
              <InfoIconBadge>
                <ToiletIcon />
              </InfoIconBadge>
              <InfoTitle>화장실</InfoTitle>
              <InfoText>{restroomInfo}</InfoText>
            </InfoBox>
          )}

          {saleItemInfo && (
            <InfoBox style={{ gridColumn: "1 / -1" }}>
              <InfoIconBadge>
                <SparklesIcon />
              </InfoIconBadge>
              <InfoTitle>판매 품목</InfoTitle>
              <InfoText>{saleItemInfo}</InfoText>
            </InfoBox>
          )}

          {homepageUrl && (
            <InfoBox style={{ gridColumn: "1 / -1" }}>
              <InfoIconBadge>
                <GlobeIcon />
              </InfoIconBadge>
              <InfoTitle>홈페이지</InfoTitle>
              <InfoText>
                <a href={homepageUrl} target="_blank" rel="noopener noreferrer">
                  {homepageUrl}
                </a>
              </InfoText>
            </InfoBox>
          )}

          {spotDetail?.intro.chkpet && (
            <InfoBox
              style={{ gridColumn: "1 / -1", backgroundColor: "#e5faf880" }}
            >
              <InfoIconBadge>
                <SparklesIcon />
              </InfoIconBadge>
              <InfoTitle>애완동물 동반</InfoTitle>
              <InfoText>{spotDetail?.intro.chkpet}</InfoText>
            </InfoBox>
          )}
        </InfoContainer>

        {spotDetail.info?.length > 0 && isRoomInfo && (
          <RoomListBox>
            <OverviewTitle>객실 정보</OverviewTitle>
            {spotDetail.info.map((room, idx) => (
              <RoomCard key={`${room.contentid}-${idx}`}>
                {room.roomimg1 && (
                  <RoomImage
                    src={room.roomimg1}
                    alt={room.roomimg1alt || room.roomtitle}
                  />
                )}

                <RoomCardBody>
                  <RoomTitle>{room.roomtitle}</RoomTitle>

                  {(room.roomsize1 || room.roomsize2) && (
                    <RoomMeta>
                      {room.roomsize1 && `${room.roomsize1}평`}
                      {room.roomsize1 && room.roomsize2 && " · "}
                      {room.roomsize2 && `${room.roomsize2}㎡`}
                    </RoomMeta>
                  )}

                  {(room.roombasecount || room.roommaxcount) && (
                    <RoomMeta>
                      기준 {room.roombasecount}명
                      {room.roommaxcount &&
                        room.roommaxcount !== room.roombasecount &&
                        ` / 최대 ${room.roommaxcount}명`}
                    </RoomMeta>
                  )}

                  <RoomAmenityList>
                    {ROOM_AMENITIES.filter(({ key }) => room[key] === "Y").map(
                      ({ key, label }) => (
                        <AmenityChip key={key}>{label}</AmenityChip>
                      ),
                    )}
                  </RoomAmenityList>

                  {(room.roomoffseasonminfee1 ||
                    room.roompeakseasonminfee1) && (
                    <RoomFeeBox>
                      {room.roomoffseasonminfee1 && (
                        <RoomFeeRow>
                          <RoomFeeLabel>비수기</RoomFeeLabel>
                          <RoomFeeValue>
                            {Number(room.roomoffseasonminfee1).toLocaleString()}
                            원~
                          </RoomFeeValue>
                        </RoomFeeRow>
                      )}
                      {room.roompeakseasonminfee1 && (
                        <RoomFeeRow>
                          <RoomFeeLabel>성수기</RoomFeeLabel>
                          <RoomFeeValue>
                            {Number(
                              room.roompeakseasonminfee1,
                            ).toLocaleString()}
                            원~
                          </RoomFeeValue>
                        </RoomFeeRow>
                      )}
                    </RoomFeeBox>
                  )}

                  {room.roomintro && <RoomIntro>{room.roomintro}</RoomIntro>}
                </RoomCardBody>
              </RoomCard>
            ))}
          </RoomListBox>
        )}

        {spotDetail.info?.length > 0 && !isRoomInfo && (
          <InfoListBox>
            <OverviewTitle style={{ gridColumn: "1 / -1" }}>
              상세 안내
            </OverviewTitle>
            {spotDetail.info.map((item) => (
              <InfoListItem key={item.serialnum}>
                <InfoListLabel>{item.infoname}</InfoListLabel>
                <InfoListText
                  dangerouslySetInnerHTML={{ __html: item.infotext || "" }}
                />
              </InfoListItem>
            ))}
          </InfoListBox>
        )}

        {/* 대체 관광지 어떻게 불러오지? 우선 api는 없음 */}
        <RecommendationBox>
          {/* <RecommendationTitle>{status.recommendation}</RecommendationTitle>
          {spotDetail.recommendations.map((item) => (
            <RecommendationCard key={item.contentid}>
              <RecommendationImage src={item.firstimage} alt={item.name} />

              <RecommendationContent>
                <RecommendationName>{item.name}</RecommendationName>
                <RecommendationInfo>
                  <span>{item.addr1}</span>
                  <span style={{ color: "#c0c5ca" }}> · </span>
                  <span>{item.category}</span>
                </RecommendationInfo>
              </RecommendationContent>

              <CongestionProgressBar style={{ height: "4px", width: "40px" }}>
                <CongestionProgressFill
                  style={{
                    height: "4px",
                    backgroundColor: congestionStyle[item.congestion].bgColor,
                    width: `${congestionStyle[item.congestion].progress}%`,
                  }}
                />
              </CongestionProgressBar>
            </RecommendationCard>
          ))} */}
        </RecommendationBox>
      </SpotContent>

      <FixedButtonWrapper>
        <AddToPlanButton onClick={handleAddToPlan}>
          {selectedSpot && isSelected(selectedSpot) ? (
            <>
              <CheckIcon /> 일정에 추가되었습니다
            </>
          ) : (
            <>
              <CalendarPlusIcon /> 내 일정에 추가
            </>
          )}
        </AddToPlanButton>
      </FixedButtonWrapper>
    </SpotDetailContainer>
  );
};

const SpotDetailContainer = styled.div`
  height: 100%;
  width: 420px;

  display: flex;
  flex-direction: column;

  border-left: 1px solid #f5f2eb;

  background-color: #fdfcf8;

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    z-index: 1000;

    width: 100%;
    height: 100dvh;

    border-left: none;
  }
`;

const SpotHeaderWrapper = styled.div`
  position: relative;
`;

const SpotImage = styled.img`
  height: 192px;
  width: 100%;

  display: block;

  object-fit: cover;
`;

const SpotActions = styled.div`
  position: absolute;

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px 0;

  top: 1rem;
`;

const RightGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const BackIcon = styled(MoveLeft)`
  width: 16px;
  height: 16px;
  stroke: #1b2024;
  stroke-width: 2;
`;

const LikeIcon = styled(Heart)<{ $active?: boolean }>`
  width: 16px;
  height: 16px;

  stroke: ${({ $active }) => ($active ? "none" : "#1b2024")};
  fill: ${({ $active }) => ($active ? "#fdfcf8" : "none")};

  stroke-width: 2;
`;

const ShareIcon = styled(Share2)`
  width: 16px;
  height: 16px;
  stroke: #1b2024;
  stroke-width: 2;
`;

const IconButton = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
  border: none;
  border-radius: 30px;

  background-color: ${({ $active }) => ($active ? "#f77036" : "#f7f2ebbf")};

  transition: 0.2s all ease;

  &:hover {
    cursor: pointer;
    background-color: rgba(247, 242, 235, 1);
  }

  &:hover ${LikeIcon} {
    stroke: ${({ $active }) => ($active ? "#1b2024" : "#f77036")};
    fill: ${({ $active }) => ($active ? "none" : "#fdfcf8")};
  }
`;

const SpotHeader = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;

  bottom: 1rem;
  left: 1rem;
`;

const SpotName = styled.h2`
  font-family: Gowun Batang;
  font-weight: 600;
  font-size: 1.25rem;

  margin: 0;

  color: #fffafc;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

  line-height: 1.75rem;
`;

const SpotAddress = styled.p`
  font-size: 0.75rem;

  margin: 0;

  color: #fffafccc;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.4);

  line-height: 1rem;
`;

const SpotContent = styled.div`
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  padding: 20px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FixedButtonWrapper = styled.div`
  flex-shrink: 0;

  padding: 12px 20px;

  border-top: 1px solid #f5f2eb;
  background-color: #fdfcf8;
`;

// const CongestionBox = styled.div`
//   width: 100%;

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: space-between;

//   padding: 16px;
//   margin: 0 0 20px;

//   border: 1px solid #f5f3eb;
//   border-radius: 16px;
// `;

// const CongestionTitle = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   margin: 0 0 12px;

//   color: #2e3339;
//   font-size: 0.75rem;
//   font-weight: 500;
// `;

// const CongestionBadge = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   padding: 4px 8px;

//   border-radius: 30px;

//   color: #20201f;
//   font-size: 0.75rem;
//   font-weight: 500;
// `;

// const CongestionProgressBar = styled.div`
//   height: 8px;
//   width: 100%;

//   border-radius: 30px;

//   background-color: #eae6dd;
// `;

// const CongestionProgressFill = styled.div`
//   height: 8px;

//   border-radius: 30px;
// `;

// const CongestionText = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   margin: 8px 0 0;

//   color: #6c727a;
//   font-size: 0.75rem;
// `;

// const CongestionDescription = styled.p`
//   display: flex;
//   justify-content: start;
//   align-items: center;

//   margin: 12px 0 0;

//   color: #484e54;
//   font-size: 0.75rem;
// `;

const OverviewBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
`;

const OverviewTitle = styled.h3`
  margin: 0 0 8px;

  color: #2e3339;
  font-size: 0.75rem;
  font-weight: 500;

  line-height: 1rem;
  letter-spacing: 0.05em;
`;

const OverviewDescription = styled.p<{ $expanded: boolean }>`
  margin: 0;

  color: #1c2024;
  font-size: 0.875rem;
  font-weight: 300;

  line-height: 1.625;

  word-break: keep-all;

  display: -webkit-box;
  -webkit-line-clamp: ${({ $expanded }) => ($expanded ? "unset" : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MoreButton = styled.button`
  margin-top: 6px;

  background: none;
  border: none;
  padding: 0;

  font-size: 0.75rem;
  color: #298e8c;
  font-weight: 600;

  cursor: pointer;

  align-self: flex-start;
`;

const InfoContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 12px;

  margin: 0 0 20px;
`;

const InfoBox = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  padding: 12px;

  border: 1px solid #f5f3eb;
  border-radius: 16px;
`;

const ClockIcon = styled(Clock)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const TicketIcon = styled(Ticket)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const CalendarXIcon = styled(CalendarX)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const PhoneIcon = styled(Phone)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const ToiletIcon = styled(Toilet)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const SparklesIcon = styled(Sparkles)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const GlobeIcon = styled(Globe)`
  width: 16px;
  height: 16px;
  stroke: #097575;
  stroke-width: 2;
`;

const InfoIconBadge = styled.div`
  width: 32px;
  height: 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 0 8px;

  background-color: #cbf1ee;

  border-radius: 14px;
`;

const InfoTitle = styled.p`
  margin: 0;
  color: #6c727a;
  font-size: 0.6875rem;
  line-height: 1rem;
`;

const InfoText = styled.p`
  margin: 0;

  color: #100c0d;
  font-size: 0.875rem;
  font-weight: 500;

  word-break: keep-all;

  line-height: 1.25rem;

  a {
    color: #097575;
    text-decoration: underline;
  }
`;

const RecommendationBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  margin: 0 0 20px;

  gap: 8px;
`;

// const RecommendationTitle = styled.h3`
//   margin: 0 0 8px;

//   color: #2e3339;
//   font-size: 0.75rem;
//   font-weight: 500;

//   line-height: 1rem;
//   letter-spacing: 0.05em;
// `;

// const RecommendationCard = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   gap: 12px;

//   padding: 12px;

//   border: 1px solid #f5f3eb;
//   border-radius: 16px;
// `;

// const RecommendationImage = styled.img`
//   height: 40px;
//   width: 40px;

//   border-radius: 12px;
// `;

// const RecommendationContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 1;
// `;

// const RecommendationName = styled.p`
//   margin: 0;

//   color: #100c0d;
//   font-size: 0.875rem;
//   font-weight: 500;

//   line-height: 1.625rem;
// `;

// const RecommendationInfo = styled.div`
//   margin: 0;

//   color: #6c727a;
//   font-size: 0.6875rem;
// `;

const CalendarPlusIcon = styled(CalendarPlus)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2;
`;

const CheckIcon = styled(Check)`
  width: 16px;
  height: 16px;
  stroke: currentColor;
  stroke-width: 2.5;
`;

const AddToPlanButton = styled.button`
  box-sizing: border-box;

  height: 48px;
  width: 100%;

  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  outline: none;
  border: none;
  border-radius: 9999px;

  background-color: #0c9799;

  color: #fffafc;
  font-size: 0.875rem;
  font-weight: 500;

  line-height: 1.25rem;

  &:hover {
    background-color: #0fa0a3;
    cursor: pointer;
  }
`;

const InfoListBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin: 0 0 20px;
`;

const InfoListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  border: 1px solid #f5f3eb;
  border-radius: 12px;
`;

const InfoListLabel = styled.span`
  color: #6c727a;
  font-size: 0.6875rem;
`;

const InfoListText = styled.p`
  margin: 0;
  color: #1c2024;
  font-size: 0.875rem;
  font-weight: 300;
  line-height: 1.5;

  a {
    color: #0c9799;
  }
`;

const RoomListBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  margin: 0 0 20px;
`;

const RoomCard = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  border: 1px solid #f5f3eb;
  border-radius: 16px;

  overflow: hidden;
`;

const RoomImage = styled.img`
  width: 100%;
  height: 140px;

  display: block;
  object-fit: cover;
`;

const RoomCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  padding: 14px;
`;

const RoomTitle = styled.h4`
  margin: 0;

  color: #100c0d;
  font-size: 0.9375rem;
  font-weight: 700;
`;

const RoomMeta = styled.p`
  margin: 0;

  color: #6c727a;
  font-size: 0.75rem;
`;

const RoomAmenityList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  margin-top: 2px;
`;

const AmenityChip = styled.span`
  padding: 3px 8px;

  border-radius: 9999px;
  background-color: #edf7f6;

  color: #097575;
  font-size: 0.6875rem;
  font-weight: 500;
`;

const RoomFeeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  margin-top: 6px;
  padding-top: 10px;

  border-top: 1px solid #f5f3eb;
`;

const RoomFeeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RoomFeeLabel = styled.span`
  color: #6c727a;
  font-size: 0.75rem;
`;

const RoomFeeValue = styled.span`
  color: #100c0d;
  font-size: 0.8125rem;
  font-weight: 600;
`;

const RoomIntro = styled.p`
  margin: 8px 0 0;

  color: #a8a196;
  font-size: 0.6875rem;
  line-height: 1.4;
  word-break: keep-all;
`;

export default SpotDetail;
