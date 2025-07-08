CREATE TABLE "gps_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" text NOT NULL,
	"session_id" text NOT NULL,
	"session_type" text NOT NULL,
	"date" text NOT NULL,
	"ball_in_play_minutes" real DEFAULT 0,
	"total_distance" real DEFAULT 0,
	"high_speed_running" real DEFAULT 0,
	"hml_distance" real DEFAULT 0,
	"hml_efforts_per_min" real DEFAULT 0,
	"max_speed" real DEFAULT 0,
	"accelerations" integer DEFAULT 0,
	"decelerations" integer DEFAULT 0,
	"collisions" integer DEFAULT 0,
	"average_speed" real DEFAULT 0,
	"sprint_count" integer DEFAULT 0,
	"player_load" real DEFAULT 0,
	"dynamic_stress_load" real DEFAULT 0,
	"gps_signal_strength" real DEFAULT 0,
	"satellite_count" integer DEFAULT 0,
	"data_completeness" real DEFAULT 0,
	"temperature" real,
	"humidity" real,
	"wind_speed" real,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "injury_risk_flags" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" text NOT NULL,
	"flag_type" text NOT NULL,
	"risk_level" text NOT NULL,
	"trigger_value" real,
	"threshold" real,
	"description" text NOT NULL,
	"data_source" text NOT NULL,
	"weekly_average" real,
	"rolling_average" real,
	"status" text DEFAULT 'active',
	"acknowledged_by" text,
	"acknowledged_at" timestamp,
	"recommended_actions" text[] DEFAULT '{}',
	"created_at" timestamp DEFAULT now(),
	"resolved_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "load_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" text NOT NULL,
	"week_starting" text NOT NULL,
	"total_distance" real DEFAULT 0,
	"total_hml_distance" real DEFAULT 0,
	"total_player_load" real DEFAULT 0,
	"total_hsr" real DEFAULT 0,
	"hml_target_achievement" real DEFAULT 0,
	"load_target_achievement" real DEFAULT 0,
	"avg_readiness_score" real,
	"avg_sleep_quality" real,
	"avg_fatigue_level" real,
	"load_trend" text,
	"risk_score" real,
	"has_active_flags" boolean DEFAULT false,
	"flag_count" integer DEFAULT 0,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "match_performances" (
	"id" text PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"player_id" text NOT NULL,
	"date" text NOT NULL,
	"opponent" text NOT NULL,
	"venue" text NOT NULL,
	"result" text NOT NULL,
	"carries" integer DEFAULT 0,
	"metres_carried" integer DEFAULT 0,
	"metres_gained" integer DEFAULT 0,
	"linebreaks" integer DEFAULT 0,
	"gainline_made_percent" real DEFAULT 0,
	"kicks_metres" integer DEFAULT 0,
	"turnovers_given" integer DEFAULT 0,
	"tackles_made" integer DEFAULT 0,
	"tackles_missed" integer DEFAULT 0,
	"made_tackle_percent" real DEFAULT 0,
	"penalties_conceded" integer DEFAULT 0,
	"free_kicks_conceded" integer DEFAULT 0,
	"rucks" integer DEFAULT 0,
	"quick_ball_percent" real DEFAULT 0,
	"breakdown_steals" integer DEFAULT 0,
	"scrum_won_percent" real DEFAULT 0,
	"lineout_won_percent" real DEFAULT 0,
	"lineout_steals" integer DEFAULT 0,
	"possession_percent" real DEFAULT 0,
	"territory_percent" real DEFAULT 0,
	"attacking_minutes" real DEFAULT 0,
	"ball_in_play_minutes" real DEFAULT 0,
	"carries_over_gainline_percent" real DEFAULT 0,
	"carries_on_gainline_percent" real DEFAULT 0,
	"carries_behind_gainline_percent" real DEFAULT 0,
	"carry_efficiency_percent" real DEFAULT 0,
	"opp_carries_over_gainline_percent" real DEFAULT 0,
	"opp_carries_on_gainline_percent" real DEFAULT 0,
	"opp_carries_behind_gainline_percent" real DEFAULT 0,
	"ruck_retention_percent" real DEFAULT 0,
	"ruck_speed_0_to_3_secs_percent" real DEFAULT 0,
	"ruck_speed_3_to_6_secs_percent" real DEFAULT 0,
	"ruck_speed_over_6_secs_percent" real DEFAULT 0,
	"opp_ruck_speed_0_to_3_secs_percent" real DEFAULT 0,
	"opp_ruck_speed_3_to_6_secs_percent" real DEFAULT 0,
	"opp_ruck_speed_over_6_secs_percent" real DEFAULT 0,
	"tries_scored" integer DEFAULT 0,
	"points_scored" integer DEFAULT 0,
	"ball_carry_metres" integer DEFAULT 0,
	"linebreaks_1st_phase" integer DEFAULT 0,
	"defenders_beaten" integer DEFAULT 0,
	"offloads" integer DEFAULT 0,
	"kicks_in_play" integer DEFAULT 0,
	"kicking_metres" integer DEFAULT 0,
	"goal_kicking" text DEFAULT '0/0',
	"carrying_22m_exit_percent" real DEFAULT 0,
	"kicking_22m_exit_percent" real DEFAULT 0,
	"exit_22m_failed_percent" real DEFAULT 0,
	"own_scrum_won_percent" real DEFAULT 0,
	"own_scrum_completion_percent" real DEFAULT 0,
	"total_scrums" integer DEFAULT 0,
	"scrum_completion_percent" real DEFAULT 0,
	"ruck_arrivals" integer DEFAULT 0,
	"ruck_first_3" integer DEFAULT 0,
	"cleanouts" integer DEFAULT 0,
	"tackles_attempted" integer DEFAULT 0,
	"assist_tackles" integer DEFAULT 0,
	"dominant_tackles" integer DEFAULT 0,
	"line_breaks_conceded" integer DEFAULT 0,
	"offloads_conceded" integer DEFAULT 0,
	"carry_metres_conceded" integer DEFAULT 0,
	"tackle_breaks_conceded" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "match_summaries" (
	"id" text PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"opponent" text NOT NULL,
	"venue" text NOT NULL,
	"result" text NOT NULL,
	"final_score" text NOT NULL,
	"competition" text NOT NULL,
	"team_possession_percent" real DEFAULT 0,
	"team_territory_percent" real DEFAULT 0,
	"team_attacking_minutes" real DEFAULT 0,
	"team_ball_in_play_minutes" real DEFAULT 0,
	"team_carry_efficiency_percent" real DEFAULT 0,
	"team_ruck_retention_percent" real DEFAULT 0,
	"team_tackle_success_percent" real DEFAULT 0,
	"team_linebreaks" integer DEFAULT 0,
	"team_tries" integer DEFAULT 0,
	"team_points" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "match_try_data" (
	"id" serial PRIMARY KEY NOT NULL,
	"match_id" text NOT NULL,
	"team_name" text NOT NULL,
	"is_north_harbour" boolean NOT NULL,
	"analysis_perspective" text NOT NULL,
	"tries" jsonb NOT NULL,
	"zone_breakdown" jsonb NOT NULL,
	"quarter_breakdown" jsonb NOT NULL,
	"phase_breakdown" jsonb NOT NULL,
	"source_breakdown" jsonb NOT NULL,
	"ai_analysis" text,
	"saved_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "player_load_targets" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" text NOT NULL,
	"week_starting" text NOT NULL,
	"weekly_hml_target" real NOT NULL,
	"daily_hml_target" real NOT NULL,
	"weekly_player_load_target" real,
	"weekly_distance_target" real,
	"weekly_hsr_target" real,
	"position_multiplier" real DEFAULT 1,
	"set_by" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "player_wellness" (
	"id" serial PRIMARY KEY NOT NULL,
	"player_id" text NOT NULL,
	"date" text NOT NULL,
	"sleep_quality" integer NOT NULL,
	"muscle_soreness" integer NOT NULL,
	"fatigue_level" integer NOT NULL,
	"stress_level" integer NOT NULL,
	"mood" integer NOT NULL,
	"readiness_score" real,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" text PRIMARY KEY NOT NULL,
	"personal_details" jsonb NOT NULL,
	"rugby_profile" jsonb NOT NULL,
	"physical_attributes" jsonb NOT NULL,
	"test_results" jsonb NOT NULL,
	"skills" jsonb NOT NULL,
	"game_stats" jsonb NOT NULL,
	"contributions_data" jsonb,
	"cohesion_metrics" jsonb,
	"contract_info" jsonb,
	"character_profile" jsonb,
	"physical_performance" jsonb,
	"injuries" jsonb NOT NULL,
	"reports" jsonb NOT NULL,
	"activities" jsonb NOT NULL,
	"video_analysis" jsonb DEFAULT '[]',
	"status" jsonb NOT NULL,
	"ai_rating" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "season_analysis" (
	"id" serial PRIMARY KEY NOT NULL,
	"season" text NOT NULL,
	"team_name" text NOT NULL,
	"total_matches" integer DEFAULT 0,
	"total_tries" integer DEFAULT 0,
	"aggregated_zones" jsonb NOT NULL,
	"aggregated_quarters" jsonb NOT NULL,
	"aggregated_phases" jsonb NOT NULL,
	"aggregated_sources" jsonb NOT NULL,
	"season_ai_analysis" text,
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "squad_advice" (
	"id" serial PRIMARY KEY NOT NULL,
	"squad_id" integer,
	"advice_type" text NOT NULL,
	"category" text NOT NULL,
	"message" text NOT NULL,
	"priority" integer DEFAULT 1,
	"player_id" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "squad_selections" (
	"id" serial PRIMARY KEY NOT NULL,
	"squad_id" integer,
	"player_id" text NOT NULL,
	"position" text NOT NULL,
	"is_starter" boolean DEFAULT true,
	"order_in_position" integer DEFAULT 1,
	"selection_reason" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "squads" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"match_name" text,
	"match_date" text,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT true,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "training_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"session_type" text NOT NULL,
	"duration" integer NOT NULL,
	"intensity" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"focus_areas" text[] DEFAULT '{}',
	"weather" jsonb,
	"ball_in_play_time" real,
	"created_by" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"hashed_password" text NOT NULL,
	"role" text DEFAULT 'assistant_coach' NOT NULL,
	"department" text,
	"permissions" text[] DEFAULT '{}',
	"first_name" text,
	"last_name" text,
	"is_active" boolean DEFAULT true,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "gps_data" ADD CONSTRAINT "gps_data_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "injury_risk_flags" ADD CONSTRAINT "injury_risk_flags_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "load_analytics" ADD CONSTRAINT "load_analytics_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match_performances" ADD CONSTRAINT "match_performances_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_load_targets" ADD CONSTRAINT "player_load_targets_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "player_wellness" ADD CONSTRAINT "player_wellness_player_id_players_id_fk" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "squad_advice" ADD CONSTRAINT "squad_advice_squad_id_squads_id_fk" FOREIGN KEY ("squad_id") REFERENCES "public"."squads"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "squad_selections" ADD CONSTRAINT "squad_selections_squad_id_squads_id_fk" FOREIGN KEY ("squad_id") REFERENCES "public"."squads"("id") ON DELETE no action ON UPDATE no action;