import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RssFeedRoundedIcon from "@mui/icons-material/RssFeedRounded";

const cardData = [
  {
    img: "https://picsum.photos/800/450?random=1",
    tag: "Data Science",
    title: "Unlocking Insights: Data Analysis of Peru’s Government Datasets",
    description:
      "Discover how we explored official datasets to uncover trends and key metrics for our project.",
    authors: [
      { name: "Remy Sharp", avatar: "/static/images/avatar/1.jpg" },
      { name: "Travis Howard", avatar: "/static/images/avatar/2.jpg" },
    ],
    date: "November 28th, 2025",
  },
  {
    img: "https://picsum.photos/800/450?random=2",
    tag: "Product",
    title: "Smarter Visualization: AI Chatbot That Creates Charts Instantly",
    description:
      "Learn how our AI-powered chatbot transforms raw data into clear, interactive charts and graphs.",
    authors: [{ name: "Erica Johns", avatar: "/static/images/avatar/6.jpg" }],
    date: "December 1st, 2025",
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: (theme.vars || theme).palette.primary.light,
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({
  authors,
  date,
}: {
  authors: { name: string; avatar: string }[];
  date: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}>
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(", ")}
        </Typography>
      </Box>
      <Typography variant="caption">{date}</Typography>
    </Box>
  );
}

export function Search({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        value={value}
        onChange={onChange}
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const categories = [
  "All categories",
  ...Array.from(new Set(cardData.map((card) => card.tag))),
];

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("All categories");

  const filteredByCategory =
    selectedCategory === "All categories"
      ? cardData
      : cardData.filter((card) => card.tag === selectedCategory);

  const filteredData = filteredByCategory.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4, p: 2 }}>
        <div className="py-10">
          <Typography variant="h1" gutterBottom>
            Blog
          </Typography>
          <Typography>
            Stay in the loop with the latest about our products
          </Typography>
        </div>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexDirection: "row",
            gap: 1,
            width: { xs: "100%", md: "fit-content" },
            overflow: "auto",
          }}>
          <Search value={searchQuery} onChange={handleSearchChange} />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            width: "100%",
            justifyContent: "space-between",
            alignItems: { xs: "start", md: "center" },
            gap: 4,
            overflow: "auto",
          }}>
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              gap: 3,
              overflow: "auto",
            }}>
            {categories.map((category) => (
              <Chip
                key={category}
                onClick={() => handleCategoryClick(category)}
                size="medium"
                label={category}
                sx={
                  selectedCategory !== category
                    ? {
                        backgroundColor: "transparent",
                        border: "none",
                      }
                    : {}
                }
              />
            ))}
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              gap: 1,
              width: { xs: "100%", md: "fit-content" },
              overflow: "auto",
            }}>
            <Search value={searchQuery} onChange={handleSearchChange} />
            <IconButton size="small" aria-label="RSS feed">
              <RssFeedRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Grid container spacing={2} columns={12}>
          <Grid size={{ xs: 12, md: 6 }}>
            {filteredData.length > 0 && (
              <StyledCard
                variant="outlined"
                onFocus={() => handleFocus(0)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 0 ? "Mui-focused" : ""}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={filteredData[0].img}
                  sx={{
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {filteredData[0].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {filteredData[0].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom>
                    {filteredData[0].description}
                  </StyledTypography>
                </StyledCardContent>
                <Author
                  authors={filteredData[0].authors}
                  date={filteredData[0].date}
                />
              </StyledCard>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {filteredData.length > 1 && (
              <StyledCard
                variant="outlined"
                onFocus={() => handleFocus(1)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 1 ? "Mui-focused" : ""}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={filteredData[1].img}
                  sx={{
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {filteredData[1].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {filteredData[1].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom>
                    {filteredData[1].description}
                  </StyledTypography>
                </StyledCardContent>
                <Author
                  authors={filteredData[1].authors}
                  date={filteredData[1].date}
                />
              </StyledCard>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {filteredData.length > 2 && (
              <StyledCard
                variant="outlined"
                onFocus={() => handleFocus(2)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 2 ? "Mui-focused" : ""}
                sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={filteredData[2].img}
                  sx={{
                    height: { sm: "auto", md: "50%" },
                    aspectRatio: { sm: "16 / 9", md: "" },
                  }}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {filteredData[2].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {filteredData[2].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom>
                    {filteredData[2].description}
                  </StyledTypography>
                </StyledCardContent>
                <Author
                  authors={filteredData[2].authors}
                  date={filteredData[2].date}
                />
              </StyledCard>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {filteredData.length > 3 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  height: "100%",
                }}>
                {filteredData.length > 3 && (
                  <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(3)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 3 ? "Mui-focused" : ""}
                    sx={{ height: "100%" }}>
                    <StyledCardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}>
                      <div>
                        <Typography
                          gutterBottom
                          variant="caption"
                          component="div">
                          {filteredData[3].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          {filteredData[3].title}
                        </Typography>
                        <StyledTypography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom>
                          {filteredData[3].description}
                        </StyledTypography>
                      </div>
                    </StyledCardContent>
                    <Author
                      authors={filteredData[3].authors}
                      date={filteredData[3].date}
                    />
                  </StyledCard>
                )}
                {filteredData.length > 4 && (
                  <StyledCard
                    variant="outlined"
                    onFocus={() => handleFocus(4)}
                    onBlur={handleBlur}
                    tabIndex={0}
                    className={focusedCardIndex === 4 ? "Mui-focused" : ""}
                    sx={{ height: "100%" }}>
                    <StyledCardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        height: "100%",
                      }}>
                      <div>
                        <Typography
                          gutterBottom
                          variant="caption"
                          component="div">
                          {filteredData[4].tag}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                          {filteredData[4].title}
                        </Typography>
                        <StyledTypography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom>
                          {filteredData[4].description}
                        </StyledTypography>
                      </div>
                    </StyledCardContent>
                    <Author
                      authors={filteredData[4].authors}
                      date={filteredData[4].date}
                    />
                  </StyledCard>
                )}
              </Box>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {filteredData.length > 5 && (
              <StyledCard
                variant="outlined"
                onFocus={() => handleFocus(5)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 5 ? "Mui-focused" : ""}
                sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  image={filteredData[5].img}
                  sx={{
                    height: { sm: "auto", md: "50%" },
                    aspectRatio: { sm: "16 / 9", md: "" },
                  }}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {filteredData[5].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {filteredData[5].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom>
                    {filteredData[5].description}
                  </StyledTypography>
                </StyledCardContent>
                <Author
                  authors={filteredData[5].authors}
                  date={filteredData[5].date}
                />
              </StyledCard>
            )}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
