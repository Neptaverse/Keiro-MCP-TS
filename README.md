<p align="center">
  <img src="https://keiro.dev/logo.svg" width="80" alt="KEIRO Logo" />
</p>

<h1 align="center">KEIRO MCP Server</h1>

<p align="center">
  <strong>Give your AI agents the power of real-time web intelligence</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@keiro/mcp"><img src="https://img.shields.io/npm/v/@keiro/mcp?style=flat-square&color=00d4ff" alt="npm version" /></a>
  <a href="https://github.com/keiro-labs/keiro-mcp/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" /></a>
  <a href="https://keiro.dev"><img src="https://img.shields.io/badge/docs-keiro.dev-black?style=flat-square" alt="Docs" /></a>
</p>

<p align="center">
  <a href="#installation">Installation</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#tools">Tools</a> •
  <a href="#examples">Examples</a>
</p>

---

## What is this?

This is the official **Model Context Protocol (MCP)** server for the [KEIRO API](https://keiro.dev). It enables AI assistants like Claude to search the web, conduct deep research, extract web content, and get AI-powered answers—all in real-time.

## Installation

```bash
# Clone the repository
git clone https://github.com/keiro-labs/keiro-mcp.git
cd keiro-mcp

# Install dependencies
npm install

# Build
npm run build
```

## Configuration

### 1. Get your API Key

Sign up at [keiro.dev](https://keiro.dev) and get your API key from the dashboard.

### 2. Configure Claude Desktop

Add to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "keiro": {
      "command": "node",
      "args": ["/absolute/path/to/keiro-mcp/dist/index.js"],
      "env": {
        "KEIRO_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### 3. Restart Claude Desktop

The KEIRO tools will now be available in Claude.

---

## Tools

| Tool | Description |
|------|-------------|
| `keiro_search` | Fast web search with AI-optimized results |
| `keiro_search_pro` | Enhanced search with metadata and related queries |
| `keiro_research` | Deep research with summary and key points |
| `keiro_research_pro` | Comprehensive research with analysis and sources |
| `keiro_answer` | Direct AI-powered answers with citations |
| `keiro_crawl` | Extract content from any web page |

---

## Examples

Once configured, you can ask Claude things like:

> "Search for the latest developments in quantum computing"

> "Research the impact of AI on healthcare in 2024"

> "What are the key features of the new iPhone?"

> "Extract the main content from https://example.com/article"

Claude will use the appropriate KEIRO tool to fetch real-time information.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `KEIRO_API_KEY` | Yes | Your KEIRO API key |
| `KEIRO_BASE_URL` | No | Custom API URL (default: production) |

---

## Development

```bash
# Watch mode
npm run dev

# Type check
npm run typecheck

# Build
npm run build
```

---

## API Reference

This MCP server uses the following KEIRO API endpoints:

- `POST /search` - Basic search
- `POST /search-pro` - Advanced search
- `POST /research` - Topic research
- `POST /research-pro` - Deep research
- `POST /answer` - AI answers
- `POST /web-crawler` - Page extraction

Full API documentation: [keiro.dev/docs](https://keiro.dev/docs)

---

## License

MIT © [KEIRO](https://keiro.dev)

---

<p align="center">
  <sub>Built with ❤️ by the KEIRO team</sub>
</p>
