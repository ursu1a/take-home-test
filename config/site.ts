export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Take-Home Assignment",
  description:
    "Simplified MVP-style web application that demonstrates an expertise",
  navItems: [
    {
      label: "Games",
      href: "/games",
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
    },
  ],
  global: {
    read_more: "Read More",
    read_less: "Read Less",
  },
  account: {
    loginGoole: "Log in with Google",
    logout: "Logout",
    signed_in_as: "Signed in as",
  },
  buyingFunnel: {
    title: "Purchase Diamonds",
    your_diamonds: "Your Diamonds",
    select_amount: "Select Amount",
    diamond: "Diamond",
    purchase_diamonds: "Purchase Diamonds",
    clear_diamonds: "Clear",
    units: {
      usd: "$",
    },
    messages: {
      authorization_required: "Authorization required",
      please_choose_amount: "Please Choose Amount",
      diamonds_save_success: "Your Diamonds Saved",
      diamonds_save_error: "Your Diamonds Failed",
      diamonds_clear_success: "Your Diamonds Cleared",
      diamonds_clear_error: "Your Diamonds Failed",
      diamonds_range_error: "`Value must be between 0 and ",
    },
  },
  games: {
    title: "Games",
    games_list: "Games List",
    no_games: "No Games",
    load_more: "Load More",
    failed_games_error: "Failed to load games",
    details: {
      title: "Details",
      release_date: "Release date",
      failed_game_details: "Failed to load game details",      
    },
  },
};
