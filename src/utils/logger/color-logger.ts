import chalk from 'chalk';

/**
 *  * Simple but professional logger with color coding
 */

const logger = {
  info: (message: string) => {
    console.log(`${chalk.blue('INFO')} › ${message}`);
  },

  success: (message: string) => {
    console.log(`${chalk.green('SUCCESS')} › ${message}`);
  },

  warn: (message: string) => {
    console.log(`${chalk.yellow('WARNING')} › ${message}`);
  },

  error: (message: string, error?: Error) => {
    console.error(`${chalk.red('ERROR')} › ${message}`);
    if (error?.stack) console.error(chalk.red(error.stack));
  },

  db: (message: string) => {
    console.log(`${chalk.magenta('DATABASE')} › ${message}`);
  },

  http: (method: string, path: string, status: number) => {
    let statusColor;

    if (status >= 500) {
      statusColor = chalk.red;
    } else if (status >= 400) {
      statusColor = chalk.yellow;
    } else if (status >= 300) {
      statusColor = chalk.cyan;
    } else if (status >= 200) {
      statusColor = chalk.green;
    } else {
      statusColor = chalk.gray;
    }
    console.log(`${chalk.cyan('HTTP')} › ${method} ${path} ${statusColor(status)}`);
  },
};

export default logger;
