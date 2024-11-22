# Censys Take-Home Project

### Prompt

> Using the Censys REST API, write and package up a client-side runnable web page that displays a paginated list of IPv4 hosts for a given search query.
>
> The general page layout should reflect a barebones version of our own censys.io/ipv4 page, consisting of:
>
> - A text field to enter a plain-text search query
> - A list of results that simply displays the IP address and number of protocols associated with each result
> - A button/link to append the next page of results for the given query

### Approach

I wanted to create a dark mode/terminal theme while adhering to the 4-hour time constraint. To achieve this, I focused on simplicity and avoided the trap of overengineering.

### Setup

Run the following commands in your terminal:

```sh
npm install

npm run dev
```

### Testing

1. Navigate to the URL displayed in your terminal output (e.g., <http://localhost:5173/>).
1. Enter a search term in the input box at the top of the page and press Enter (e.g., `waffles`).
1. Verify that the search term's results are displayed.
1. Click the Add More Results button to append additional results to the current list.
1. Enter a search term in the input box that has limited results and press Enter (e.g., `tacotuesday`).
1. Confirm that the Add More Results button does not appear when all results have been exhausted.
