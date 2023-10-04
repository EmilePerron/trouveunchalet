<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20231003235302 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add unique constraint for internal_id + parent_site';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP INDEX IDX_CB0048D454A03F50BFDFB4D8, ADD UNIQUE INDEX UNIQ_CB0048D454A03F50BFDFB4D8 (parent_site, internal_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE listing DROP INDEX UNIQ_CB0048D454A03F50BFDFB4D8, ADD INDEX IDX_CB0048D454A03F50BFDFB4D8 (parent_site, internal_id)');
    }
}
