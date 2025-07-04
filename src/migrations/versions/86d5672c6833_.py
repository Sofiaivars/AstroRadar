"""empty message

Revision ID: 86d5672c6833
Revises: 
Create Date: 2025-06-26 11:44:09.507458

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '86d5672c6833'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=False),
    sa.Column('lastname', sa.Text(), nullable=False),
    sa.Column('username', sa.Text(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('city', sa.String(length=120), nullable=False),
    sa.Column('country', sa.String(length=120), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###
