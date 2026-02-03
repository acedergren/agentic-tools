# Frequently Asked Questions

Common questions about the skills ecosystem.

## What are skills?

Skills are reusable capabilities for AI agents. They provide procedural knowledge that helps agents accomplish specific tasks more effectively. Skills can include code generation patterns, domain expertise, tool integrations, and more.

## How do I install a skill?

Use the skills CLI: npx skills add <owner>/<skill-name>. For example, npx skills add vercel-labs/agent-skills installs the agent skills collection.

## Which AI agents support skills?

Skills work with popular AI coding agents including Claude Code, Cursor, Windsurf, and others. Check each skill's documentation for specific compatibility information.

## How is the leaderboard ranked?

The skills leaderboard is powered by anonymous telemetry data from the skills CLI. When users install skills, aggregated installation counts help surface the most popular skills. No personal or device information is collected—only aggregate skill installation metrics.

## How do I get my skill listed on the leaderboard?

Skills appear on the leaderboard automatically through anonymous telemetry when users run npx skills add <owner/repo>. Once your skill is installed by users, it will be tracked and appear in the rankings based on its installation count.

## Is any personal data collected?

No. The telemetry is completely anonymous and only tracks aggregate skill installation counts. No personal information, usage patterns, or identifying data is collected or stored.

## How do I create my own skill?

Skills are hosted in GitHub repositories. Create a repository with a skill definition file and a README explaining how to use the skill. See existing popular skills for examples of the structure and format.

## Can I opt out of telemetry?

Yes. You can disable telemetry when using the add-skills CLI. See the CLI documentation for configuration options.

## How do I report a problem with a skill?

Skills are maintained by their respective authors. Visit the skill's GitHub repository and open an issue there. You can find the repository link on each skill's detail page.