// Action Methods for Home Domain
// Get "/"
// Get "/index"
const home = (req, res) => {
  const iconSet = ['⭐', '🤖', '🍉', '🐋', '🛠️'];
  const icon = iconSet[Math.floor(Math.random() * iconSet.length)];
  res.render('index', { title: 'Express', icon });
};

// GET "/about"
const about = (req, res) => {
  res.send('⚠️ UNDER CONSTRUCTION: GET /about ⚠️');
};

export default {
  home,
};
