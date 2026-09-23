create table if not exists detective_progress (
  user_id text primary key,
  detective_name text not null default '',
  level text not null default 'iniciante',
  completed_stations jsonb not null default '[]'::jsonb,
  clues jsonb not null default '{}'::jsonb,
  score integer not null default 0,
  certified boolean not null default false,
  updated_at timestamptz not null default now()
);
