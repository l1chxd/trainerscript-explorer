import { readFile } from 'fs/promises';
import path from 'path';
import { z, ZodIssue, ZodType } from 'zod';

type DatasetConfig<T> = {
  file: string;
  schema: ZodType<T>;
  label: string;
  identifierKeys: string[];
};

const muscleSchema = z.object({
  id: z.string(),
  name: z.string(),
  group: z.string(),
  regions: z.array(z.string()),
  summary: z.string(),
  origin: z.array(z.string()),
  insertion: z.array(z.string()),
  function: z.array(z.string()),
  exercises: z.array(z.string()),
  tips: z.array(z.string()).optional(),
});

const exerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  pattern: z.string(),
  primary: z.array(z.string()),
  secondary: z.array(z.string()),
  setup: z.array(z.string()),
  execution: z.array(z.string()),
  common_errors: z.array(z.string()),
  coaching_cues: z.array(z.string()),
  regression: z.array(z.string()),
  progression: z.array(z.string()),
  contraindications: z.array(z.string()),
  safe_alternatives: z.array(z.string()),
  source: z.object({
    doc: z.string(),
    pages: z.string(),
  }),
});

const injurySchema = z.object({
  key: z.string(),
  title: z.string(),
  desc: z.string(),
});

const enduranceSchema = z.object({
  zone: z.string(),
  intensity: z.string(),
  methods: z.array(z.string()),
  goal: z.string(),
});

const trainingPrincipleSchema = z.object({
  title: z.string(),
  desc: z.string(),
});

const datasets: DatasetConfig<unknown>[] = [
  {
    file: 'muscles.json',
    schema: muscleSchema,
    label: 'muscle',
    identifierKeys: ['id', 'name'],
  },
  {
    file: 'exercises.json',
    schema: exerciseSchema,
    label: 'exercise',
    identifierKeys: ['id', 'name'],
  },
  {
    file: 'injuries.json',
    schema: injurySchema,
    label: 'injury',
    identifierKeys: ['key', 'title'],
  },
  {
    file: 'endurance.json',
    schema: enduranceSchema,
    label: 'endurance zone',
    identifierKeys: ['zone'],
  },
  {
    file: 'training_principles.json',
    schema: trainingPrincipleSchema,
    label: 'training principle',
    identifierKeys: ['title'],
  },
];

function formatPath(pathSegments: Array<string | number>): string {
  if (pathSegments.length === 0) {
    return '(root)';
  }

  return pathSegments.reduce((acc, segment) => {
    if (typeof segment === 'number') {
      return `${acc}[${segment}]`;
    }

    return acc ? `${acc}.${segment}` : segment;
  }, '');
}

function formatIssue(issue: ZodIssue): string {
  const location = formatPath(issue.path);
  return `${location}: ${issue.message}`;
}

function describeItem(config: DatasetConfig<unknown>, item: unknown, index: number): string {
  if (item && typeof item === 'object') {
    const record = item as Record<string, unknown>;
    for (const key of config.identifierKeys) {
      const value = record[key];
      if (typeof value === 'string' && value.trim().length > 0) {
        return `${config.label} ${key}="${value}"`;
      }
    }
  }

  return `${config.label} entry #${index + 1}`;
}

async function validateDataset(config: DatasetConfig<unknown>): Promise<boolean> {
  const filePath = path.join(process.cwd(), 'data', config.file);
  const relativePath = path.relative(process.cwd(), filePath);

  let raw: string;
  try {
    raw = await readFile(filePath, 'utf8');
  } catch (error) {
    console.error(`❌ Failed to read ${relativePath}: ${(error as Error).message}`);
    return false;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error(`❌ ${relativePath}: Invalid JSON - ${(error as Error).message}`);
    return false;
  }

  if (!Array.isArray(parsed)) {
    console.error(`❌ ${relativePath}: Expected top-level array`);
    return false;
  }

  let isValid = true;

  parsed.forEach((entry, index) => {
    const result = config.schema.safeParse(entry);
    if (!result.success) {
      isValid = false;
      console.error(`❌ ${relativePath} → ${describeItem(config, entry, index)}`);
      result.error.issues.forEach((issue) => {
        console.error(`   - ${formatIssue(issue)}`);
      });
    }
  });

  if (isValid) {
    console.log(`✅ ${relativePath} (${parsed.length} entries)`);
  }

  return isValid;
}

async function main(): Promise<void> {
  let allValid = true;
  for (const dataset of datasets) {
    const result = await validateDataset(dataset);
    if (!result) {
      allValid = false;
    }
  }

  if (!allValid) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error('❌ Unexpected error during validation');
  console.error(error);
  process.exitCode = 1;
});
