# StockWatch

## Installation

run `npm install -i`

## Usage

run `npm run start-dev` to start in dev mode


## Some considered improvements:
- [ ]  1. general bug fixes and error handling
- [ ]  2. unify the interface components and use only material UI
- [ ]  3. add media queries to make the interface responsive
- [ ]  4. fix accesibility issues (tab indices, alt texts, screen reader, etc.)
- [ ]  5. use `stockcharts` from `chartjs-v3` (after writing the types for it and fixing the wrapper)
- [ ]  6. add proper texts and tooltips for the buttons
- [ ]  7. keep the colors of charts from render to render
- [ ]  8. change design
- [ ]  9. save in history the selected symbols in order to create a shareable link
- [ ] 10. display the name of the company next to it's symbol on charts (or display it on mouse over)
- [ ] 11. multiple selectable datasets on the same chart
- [ ] 12. preload the data and cache it for smoother animations
- [ ] 13. webworker with a proxied web socket connection (by the node server) to the webhook of the stock api for realtime changes
- [ ] 14. multiple themes, with [`Material UI Theming`](https://material-ui.com/customization/theming/)
- [ ] 15. implement posibility to switch between candle stick and line charts
